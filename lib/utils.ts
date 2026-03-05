export function splitTitle(title: string) {
  const words = title.split(" ");
  if (words.length <= 4) return { line1: title, line2: null };
  const mid = Math.ceil(words.length / 2);
  return {
    line1: words.slice(0, mid).join(" "),
    line2: words.slice(mid).join(" "),
  };
}
