import replaceNonBreakableSpaces from './replaceNonBreakableSpaces';

const capitalise = text => text.charAt(0).toUpperCase() + text.substr(1);

/**
 * Capitalises the first letter of a sentence if it ends in a valid
 * punctuation mark (which can be preceded by any numberof break tags).
 *
 * Modified from: https://tinyurl.com/y8wlmf9g.
 */
export default comment =>
  replaceNonBreakableSpaces(comment).replace(
    /.*?(([.!?]\s?(<br\s*\/?>)+)|[.!?])(\s?|$)/g,
    capitalise
  );
