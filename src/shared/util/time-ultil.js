/**
 * Combine the time and date into a single string
 * @param {Date} date only the date part
 * @param {Date} time only the time part
 * @returns {string} shape of "YYYY-MM-DDTHH:mm:ssZ"
 */
export const combineDateAndTime = (date, time) => {
  const datePart = date.format('YYYY-MM-DD');
  const timePart = time.format('HH:mm:ss');
  return `${datePart}T${timePart}Z`;
};
