export function shortText(text, length = 10) {
  return text?.slice(0, length) || "";
}
