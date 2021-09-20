/**
 * Function for capitalizing string
 *
 * @param {string} s string to capitalze
 * @returns {string}
 */
export const capitalize = (s: string) => {
  if (s.length === 0) {
    return '';
  } else if (s.length === 1) {
    return s.toUpperCase();
  } else {
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }
};
