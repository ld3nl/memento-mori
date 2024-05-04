import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInWeeks,
  addYears,
  addMonths,
  // format,
  parse,
} from "date-fns";

/**
 * Parses a date string or passes through a Date object.
 * @param {Date | string} date - The date to parse or pass through.
 * @returns {Date} The parsed or passed through date.
 */
function parseDate(date: Date | string): Date {
  if (typeof date === "string") {
    // Adjusted to handle "MMMM d, yyyy" format
    return parse(date, "MMMM d, yyyy", new Date());
  } else {
    return date;
  }
}

/**
 * Calculates the number of weeks between today and the birthDate.
 * If a static date is provided, it will calculate the difference to that date instead.
 *
 * @param {Date | string} birthDate - The birth date as a Date object or string.
 * @param {Date | string | undefined} staticToday - Optional; a static "today" date as a Date object or string.
 * @returns {number} The total number of weeks between the dates.
 */
export function calculateWeeksSinceBirth(
  birthDate: Date | string,
  staticToday?: Date | string
): number {
  const parsedBirthDate = parseDate(birthDate);
  const today = staticToday ? parseDate(staticToday) : new Date();

  return differenceInWeeks(today, parsedBirthDate);
}

/**
 * Calculates the age in full years, months, and the remainder in days.
 * @param {Date} startDate - The birth date.
 * @param {Date} endDate - The current date.
 * @returns {{ years: number, months: number, days: number }} Object containing years, months, and days lived.
 */
function getDateDifference(
  startDate: Date,
  endDate: Date
): { years: number; months: number; days: number } {
  const years = differenceInYears(endDate, startDate);
  const months = differenceInMonths(endDate, addYears(startDate, years));
  const days = differenceInDays(
    endDate,
    addMonths(addYears(startDate, years), months)
  );

  return { years, months, days };
}

/**
 * Provides a detailed age breakdown and total weeks and days lived.
 * @param {Date | string} birthDateString - The birth date as a string or Date.
 * @returns {{ ageLived: string; livedWeeksAndDays: string }} An object containing formatted age and total weeks and days lived.
 */
export function calculateAgeAndLivedWeeksAndDays(
  birthDateString: Date | string
): {
  ageLived: string;
  livedWeeksAndDays: string;
} {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const { years, months, days } = getDateDifference(birthDate, today);

  const totalLivedDays = differenceInDays(today, birthDate);
  const totalLivedWeeks = differenceInWeeks(today, birthDate);

  return {
    ageLived: `${years} years, ${months} months, and ${days} days`,
    livedWeeksAndDays: `${totalLivedWeeks} weeks and ${
      totalLivedDays % 7
    } days`,
  };
}
