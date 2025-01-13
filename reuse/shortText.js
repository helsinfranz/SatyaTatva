export function shortText(text, length = 10) {
  if (text.length <= length) return text;
  const words = text.split(" ");
  let shortString = "";
  for (const word of words) {
    if (shortString.length + word.length > length) break;
    shortString += word + " ";
  }
  if (shortString.length === 0) {
    return text.substring(0, length);
  }
  return shortString.trim();
}
