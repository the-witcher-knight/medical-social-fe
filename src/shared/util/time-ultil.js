import dayjs from 'dayjs';

/**
 * Combine the time and date into a single string
 * @param {Date} date only the date part
 * @param {Date} time only the time part
 * @returns {string} shape of "YYYY-MM-DDTHH:mm:ssZ"
 */
export const combineDateAndTime = (date, time) => {
  const datePart = dayjs(date).format('YYYY-MM-DD');
  const timePart = dayjs(time).format('HH:mm');
  return `${datePart}T${timePart}:00Z`;
};

/**
 * Convert date to string.
 * @param {Date} date the js Date.
 * @returns string date.
 */
export const dateToString = date => {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ss[Z]');
};

export const dateToViewString = date => {
  return dayjs(date).format('DD/MM/YYYY');
};

/**
 * Get time from a string
 * @param {string} str string of "YYYY-MM-DDTHH:mm:ssZ"
 * @returns time part of str with format "HH:mm:ss"
 */
export const extractTimeFromString = str => {
  const date = new Date(str);
  return `${date.getUTCHours()}:${
    date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes()
  }:${date.getUTCSeconds()}`;
};
