import { NextResponse } from "next/server";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODEL = "openai/gpt-oss-20b";

const FIELD_MAX_LENGTH = 300;
const REQUEST_TIMEOUT_MS = 20_000;

const MAX_COMPLETION_TOKENS = 1200;

const RETRY_DELAY_MS = 800;

type ErrorCode =
  | "not_configured"
  | "bad_request"
  | "invalid_key"
  | "rate_limited"
  | "model_unavailable"
  | "upstream_unreachable"
  | "upstream_busy"
  | "upstream_error";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function fail(code: ErrorCode, message: string, status: number) {
  return NextResponse.json({ error: message, code }, { status });
}

function clamp(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, FIELD_MAX_LENGTH) : "";
}

function buildPrompt(fields: {
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  department: string;
}): string {
  const { title, artistDisplayName, objectDate, medium, department } = fields;

  return [
    `Write an engaging description (around 150 words) of the artwork "${title}"`,
    artistDisplayName ? ` by ${artistDisplayName}` : "",
    objectDate ? `, ${objectDate}` : "",
    ".",
    medium ? ` Medium: ${medium}.` : "",
    department ? ` Department: ${department}.` : "",
    " Address a curious visitor who wants to understand the work's significance and context. Write in plain prose. Do not use markdown, asterisks, headings or bullet points.",
  ].join("");
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/_(.+?)_/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^#{1,6}\s+/gm, "");
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("[api/groq] GROQ_API_KEY is not set in this environment");
    return fail("not_configured", "AI descriptions are not configured.", 500);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("bad_request", "Request body must be valid JSON.", 400);
  }

  const fields = body as Record<string, unknown>;
  const title = clamp(fields.title);

  if (!title) {
    return fail("bad_request", "A title is required.", 400);
  }

  const model = process.env.GROQ_MODEL ?? DEFAULT_MODEL;

  const prompt = buildPrompt({
    title,
    artistDisplayName: clamp(fields.artistDisplayName),
    objectDate: clamp(fields.objectDate),
    medium: clamp(fields.medium),
    department: clamp(fields.department),
  });

  function callGroq() {
    return fetch(GROQ_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: prompt }],
        max_completion_tokens: MAX_COMPLETION_TOKENS,
        reasoning_effort: "low",
        reasoning_format: "hidden",
        temperature: 0.6,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  }

  let response: Response;

  try {
    response = await callGroq();

    if (response.status === 503 || response.status === 500) {
      console.warn(`[api/groq] Groq responded ${response.status}, retrying once`);
      await sleep(RETRY_DELAY_MS);
      response = await callGroq();
    }
  } catch (error) {
    console.error("[api/groq] could not reach Groq:", error);
    return fail("upstream_unreachable", "The AI service is unavailable right now.", 504);
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "<unreadable body>");
    console.error(`[api/groq] Groq responded ${response.status} for model "${model}": ${detail.slice(0, 500)}`);

    if (response.status === 401 || response.status === 403) {
      return fail("invalid_key", "AI descriptions are not configured.", 500);
    }

    if (response.status === 429) {
      return fail("rate_limited", "Too many requests. Please try again in a moment.", 429);
    }

    if (response.status === 503 || response.status === 500) {
      return fail("upstream_busy", "The AI service is busy. Please try again in a moment.", 503);
    }

    if (detail.includes("model_decommissioned") || detail.includes("model_not_found")) {
      console.error(
        `[api/groq] model "${model}" is no longer served. Set GROQ_MODEL to a current model — see https://console.groq.com/docs/deprecations`,
      );
      return fail("model_unavailable", "The AI service is temporarily unavailable.", 502);
    }

    return fail("upstream_error", "The AI service returned an error.", 502);
  }

  const data = await response.json();
  const choice = data?.choices?.[0];
  const raw: string = choice?.message?.content ?? "";
  const description = stripMarkdown(raw).trim();

  if (choice?.finish_reason === "length") {
    console.warn(
      `[api/groq] response truncated at ${MAX_COMPLETION_TOKENS} tokens for "${title}" — consider raising MAX_COMPLETION_TOKENS`,
    );
  }

  if (!description) {
    console.error("[api/groq] Groq returned a response with no content:", JSON.stringify(data).slice(0, 500));
    return fail("upstream_error", "The AI service returned an empty response.", 502);
  }

  return NextResponse.json({ description });
}
