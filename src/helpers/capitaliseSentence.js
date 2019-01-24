import replaceNonBreakableSpaces from './replaceNonBreakableSpaces';

// https://30secondsofcode.org/string#capitalize
const capitalise = ([first, ...rest]) => first.toUpperCase() + rest.join('');

/**
 * Capitalises the first letter of a sentence if it ends in a
 * valid punctuation mark (which can be preceded by a break tag).
 *
 * Modified from: https://tinyurl.com/y8wlmf9g.
 */
export default comment =>
  replaceNonBreakableSpaces(comment).replace(
    /.*?(([.!?]\s?(<br\s*\/?>)+)|[.!?])(\s?|$)/g,
    capitalise
  );
