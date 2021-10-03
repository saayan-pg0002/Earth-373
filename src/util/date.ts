export const isCurrentDateBetween = (
  startDate: Date,
  endDate: Date
): boolean => {
  const currentDate = new Date();
  return currentDate >= startDate && currentDate <= endDate;
};

// e.g. 9:30 AM - 10:30 AM
export const getStartEndFormattedTimeString = (
  startDate: Date,
  endDate: Date
): String =>
  `${getFormattedTimeString(startDate)} - ${getFormattedTimeString(endDate)}`;

// e.g 10:30 AM
const getFormattedTimeString = (date: Date): string => {
  let hour = date.getHours();
  hour = hour > 12 ? hour - 12 : hour;

  const minute = date.getMinutes();
  const timePeriod = date.toLocaleTimeString().split(' ')[1];

  return `${hour}:${minute < 10 ? `0${minute}` : minute} ${timePeriod}`;
};
