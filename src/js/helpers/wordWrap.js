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

export default (str, length = 70) =>
  str
    .split('<br>') // Split string at `br` tags
    .filter(segment => segment.length) // Remove empty strings
    .map(segment => splitString(segment, length).join('<br/>')) // Split these chunks if they're longer then `length`
    .join('<br/>'); // Join it all back up
