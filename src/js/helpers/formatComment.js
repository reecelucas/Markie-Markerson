/**
 * Capitalises the first letter of a sentence and forces all subsequent
 * characters to lowercase. Note that this will require a user to manually
 * capitalise proper nouns, but it is preferable to the sloppy casing
 * that results from the Speech Recognition API.
 *
 * Taken from: https://tinyurl.com/y8wlmf9g
 */
export default comment =>
  comment.replace(/.+?[.?!](\s|$)/g, text => {
    return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
  });
