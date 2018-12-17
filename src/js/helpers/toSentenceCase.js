/**
 * Capitalises the first letter of a sentence and forces all subsequent
 * characters to lowercase. Note that this will require a user to manually
 * capitalise proper nouns, but it is preferable to the sloppy casing
 * that results from the Speech Recognition API.
 *
 * Taken from: https://tinyurl.com/y8wlmf9g
 *
 * TODO: this has been crudely adapted to work when a full-stop
 * proceeds a <br> tag. Really this should be incorporated into the
 * existing regex.
 */

export default comment =>
  comment.replace(/.+?[.?!](\s|$)/g, text => {
    const casedString = `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
    return casedString
      .split('.<br>')
      .map(segment => `${segment.charAt(0).toUpperCase()}${segment.substr(1).toLowerCase()}`)
      .join('');
  });
