export function cleanHtmlText(html: string): string {
  let cleanText = html.replace(/<[^>]*>/g, " ");

  cleanText = cleanText.replace(/\s+/g, " ");

  cleanText = cleanText.trim();

  return cleanText;
}
