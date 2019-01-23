/**
 * Splits a string into an array of strings of specified `length`,
 * ensuring that the split does not occur in the middle of a word.
 * Modified from: https://tinyurl.com/y7bp96mb
 *
 * @param {string} str
 * @param {number} length - number of characters at which to split
 * @returns {array}
 */
const splitString = (str, length) => {
  let strings = [];

  while (str.length > length) {
    let pos = str.substring(0, length).lastIndexOf(' ');
    pos = pos <= 0 ? length : pos;

    strings.push(str.substring(0, pos));

    let i = str.indexOf(' ', pos) + 1;
    if (i < pos || i > pos + length) {
      i = pos;
    }

    str = str.substring(i);
  }

  strings.push(str);
  return strings;
};

export default (str, maxLength = 60) =>
  str
    .split(/<br\s*\/?>/) // Split on break tags
    .filter(Boolean) // Remove empty strings
    .map(line => line.replace(/&nbsp;/gi, '')) // Remove `&nbsp`, since they aren't stripped out by `sanitizeHtml`
    .map(line => (line.length > maxLength ? splitString(line, maxLength) : line)) // Split long lines
    .flat() // We can use this since tbis app only works in Chrome
    .join('<br/>'); // Join it all back up
