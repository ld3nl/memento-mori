import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  differenceInWeeks,
  addYears,
  addMonths,
} from "date-fns";

/**
 * Calculates the total number of weeks lived since birth.
 * @param {Date} birthDate - The birth date.
 * @returns {number} The total number of weeks lived.
 */
export function calculateWeeksSinceBirth(birthDate: Date): number {
  const today = new Date();
  return differenceInWeeks(today, birthDate);
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
