import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  const { title, artistDisplayName, objectDate, medium, department } = await request.json();

  const prompt = `Write an engaging description (around 150 words) of the artwork "${title}"${artistDisplayName ? ` by ${artistDisplayName}` : ""}${objectDate ? `, ${objectDate}` : ""}. ${medium ? `Medium: ${medium}.` : ""}${department ? ` Department: ${department}.` : ""} Address a curious visitor who wants to understand the work's significance and context.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Groq API returned an error" }, { status: 502 });
  }

  const data = await response.json();
  const description = data.choices?.[0]?.message?.content ?? "";

  return NextResponse.json({ description });
}
