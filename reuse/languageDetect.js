export default function languageDetect(word) {
  if (!word || typeof word !== "string" || word.trim() === "") {
    return false;
  }
  var firstLetter = word.charAt(0).toLowerCase();
  return firstLetter >= "a" && firstLetter <= "z";
}
