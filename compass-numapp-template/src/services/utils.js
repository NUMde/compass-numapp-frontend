/**
 * utility functions used throughout the application
 */

/**
 * generates a date string from Date Object (dd.mm.yyyy)
 * @param  {Date}    inputDate the input date
 * @param  {boolean} includeTime if true: the exported string will also contain the time
 */
const formatDateString = (inputDate, { includeTime, locale = 'de' }) => {
  return new Date(inputDate).toLocaleDateString(locale, {
    formatMatcher: 'best fit',
    localeMatcher: 'best fit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: includeTime ? '2-digit' : undefined,
    minute: includeTime ? '2-digit' : undefined,
    hourCycle: 'h23',
  });
};

// eslint-disable-next-line import/prefer-default-export
export { formatDateString };
