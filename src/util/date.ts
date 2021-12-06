export const DaysOfWeek: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

const Months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const getCurrentWeekDateObjects = (
  currentDate: Date = new Date()
): Date[] => {
  const weekDateObjects: Date[] = [];
  const startOfWeek: Date = new Date();
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  weekDateObjects.push(startOfWeek);

  for (let i: number = 1; i < 7; i++) {
    weekDateObjects.push(
      new Date(
        startOfWeek.getFullYear(),
        startOfWeek.getMonth(),
        startOfWeek.getDate() + i
      )
    );
  }

  return weekDateObjects;
};

interface CalendarDayItemInterface {
  dayOfWeek: string;
  date: number;
}

export const formatWeekDateObjectsForCalendar = (
  weekDateObjects: Date[]
): CalendarDayItemInterface[] => {
  const calendarDayItems = [];
  for (const day of weekDateObjects) {
    calendarDayItems.push({
      dayOfWeek: DaysOfWeek[day.getDay()],
      date: day.getDate()
    });
  }
  return calendarDayItems;
};

export const isCurrentDateBetween = (
  startDate: Date,
  endDate: Date
): boolean => {
  const currentDate: Date = new Date();
  return currentDate >= startDate && currentDate <= endDate;
};

// e.g. 9:30 AM - 10:30 AM
export const getStartEndFormattedTimeString = (
  startDate: Date,
  endDate: Date
): String =>
  `${getFormattedTimeString(startDate)} - ${getFormattedTimeString(endDate)}`;

// e.g 10:30 AM
export const getFormattedTimeString = (date: Date): string => {
  if (isNaN(date.getTime())) {
    return "--:--:--";
  }
  let hour: number = date.getHours();
  hour = hour > 12 ? hour - 12 : hour;

  const minute: number = date.getMinutes();
  const timePeriod: string = date.toLocaleTimeString().split(" ")[1];

  return `${hour}:${minute < 10 ? `0${minute}` : minute} ${timePeriod}`;
};

// e.g Monday, October 4 2021
export const getFormattedDayMonthYearString = (date: Date): string => {
  const dayOfWeek = DaysOfWeek[date.getDay()];
  const dateNumber = date.getDate();
  const monthName = Months[date.getMonth()];
  const year = date.getFullYear(); // 2019
  return `${dayOfWeek}, ${dateNumber} ${monthName}, ${year}`;
};

export const getStartEndFormattedTimeStringWithDay = (
  startDate: Date,
  endDate: Date
): String => {
  const dayOfWeek = DaysOfWeek[startDate.getDay()].substring(0, 3);
  return `${dayOfWeek} ${getFormattedTimeString(
    startDate
  )} - ${getFormattedTimeString(endDate)}`;
};

const getDoubleDigitString = (value: number): string => {
  return `${value < 10 ? `0${value}` : value}`;
};

export const getFormattedYearMonthDayNumericString = (date: Date): string => {
  const dateNumber: number = date.getDate();
  const monthName: number = date.getMonth() + 1;
  const year: number = date.getFullYear(); // 2019
  return `${getDoubleDigitString(year)}-${getDoubleDigitString(
    monthName
  )}-${getDoubleDigitString(dateNumber)}`;
};

export const getFormattedMonthDateYearString = (date: Date): string => {
  const dateNumber: number = date.getDate();
  const monthName = Months[date.getMonth()];
  const year: number = date.getFullYear(); // 2019
  return `${monthName} ${getDoubleDigitString(dateNumber)}, ${year}`;
};

export const getFormattedMonthYearString = (date: Date): string => {
  const monthName = Months[date.getMonth()];
  const year: number = date.getFullYear(); // 2019
  return `${monthName} ${year}`;
};

export const getFormattedHourMinuteString = (date: Date): string => {
  const hour: string = getDoubleDigitString(date.getHours());
  const minutes: string = getDoubleDigitString(date.getMinutes());
  return `${hour}:${minutes}`;
};

export const getTimeDurationString = (
  start: Date,
  end: Date
): string | boolean => {
  if (end <= start || end === start) {
    return false;
  }

  const difference: number = end.valueOf() - start.valueOf();
  let milliseconds: number = difference;
  const hour: number = Math.floor(milliseconds / 1000 / 60 / 60);
  milliseconds -= hour * 1000 * 60 * 60;
  const minutes: number = Math.floor(milliseconds / 1000 / 60);
  milliseconds -= minutes * 1000 * 60;
  const seconds: number = Math.floor(milliseconds / 1000);

  return `${getDoubleDigitString(hour)}:${getDoubleDigitString(
    minutes
  )}:${getDoubleDigitString(seconds)}`;
};

export const getDateFromTimeString = (time: string): Date => {
  const date: Date = new Date();
  const [hours, minutes] = time.split(":");
  date.setHours(Number.parseInt(hours));
  date.setMinutes(Number.parseInt(minutes));

  return date;
};
