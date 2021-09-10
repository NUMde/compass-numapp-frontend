/**
 * utility functions used throughout the application
 */

/**
 * generates a date string from Date Object (dd.mm.yyyy)
 * @param  {Date}    inputDate the input date
 * @param  {boolean} includeTime if true: the exported string will also contain the time
 */
const formatDateString = (inputDate, includeTime) => {
  const date = new Date(inputDate);
  const numericMonth = date.getMonth() + 1;

  let monthString = numericMonth.toString();
  let dayString = date.getDate().toString();
  let hourString = date.getHours().toString();
  let minutesString = date.getMinutes().toString();

  if (dayString.length === 1) dayString = `0${dayString}`;
  if (monthString.length === 1) monthString = `0${monthString}`;
  if (hourString.length === 1) hourString = `0${hourString}`;
  if (minutesString.length === 1) minutesString = `0${minutesString}`;

  let dateString = `${dayString}.${monthString}.${date.getFullYear()}`;
  if (includeTime) dateString = `${dateString}, ${hourString}:${minutesString}`;

  return dateString;
};

// eslint-disable-next-line import/prefer-default-export
export { formatDateString };
