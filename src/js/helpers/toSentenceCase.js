// https://30secondsofcode.org/string#capitalize
const capitalise = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * Capitalises the first letter of a sentence if it ends in a
 * valid punctuation mark (which can be preceded by a break tag).
 *
 * Modified from: https://tinyurl.com/y8wlmf9g.
 */
export default comment =>
  comment.replace(/.*?(([.!?]\s?<br\s*\/?>)|[.!?])(\s?|$)/g, string => capitalise(string));
