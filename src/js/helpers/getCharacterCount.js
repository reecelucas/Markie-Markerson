import { CHAR_LIMIT } from '../constants';

export default string => {
  /**
   * Remove HTML tags from the string, since we don't want
   * these included in the character count. We could use
   * the DOM here (https://tinyurl.com/ydy6s7r9), but we'd need to
   * sanitize the input, and the DOM is pretty slow for this use case.
   */
  const cleanedString = string.replace(/(<([^>]+)>)/gi, '');
  return CHAR_LIMIT - cleanedString.length;
};
