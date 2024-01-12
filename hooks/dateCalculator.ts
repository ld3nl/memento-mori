/**
 * Calculates the difference in years, months, and days between two dates.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Object} An object containing the differences in years, months, and days.
 */
function getDateDifference(startDate, endDate) {
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  let days = endDate.getDate() - startDate.getDate();

  // Adjust for day underflow
  if (days < 0) {
    months--;
    // Calculate the number of days in the previous month
    days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate();
  }

  // Adjust for month underflow
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

/**
 * Calculates the age in years, months, weeks, and days, and the total lived weeks and days.
 * @param {Date} birthDateString - The birth date as a string.
 * @returns {Object} An object containing formatted strings for age lived and lived weeks and days.
 */
export function calculateAgeAndLivedWeeksAndDays(birthDateString: Date): {
  ageLived: string;
  livedWeeksAndDays: string;
} {
  const birthDate = new Date(birthDateString).getTime();
  const today = new Date().getTime();
  const { years, months, days } = getDateDifference(
    new Date(birthDate),
    new Date(today)
  );

  // Calculate the total number of days lived
  const totalLivedDays = Math.floor(
    (today - birthDate) / (1000 * 60 * 60 * 24)
  );

  return {
    ageLived: `${years} years, ${months} months, ${Math.floor(
      days / 7
    )} weeks, and ${days % 7} days`,
    livedWeeksAndDays: `${Math.floor(totalLivedDays / 7)} weeks and ${
      totalLivedDays % 7
    } days`,
  };
}

/**
 * Calculates the total number of weeks lived since birth.
 * @param {Date} birthDateString - The birth date as a string.
 * @returns {number} The total number of weeks lived.
 */
export function calculateWeeksSinceBirth(birthDateString: Date): number {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const { years, months, days } = getDateDifference(birthDate, today);

  // Calculate weeks from years, months, and days
  return years * 52 + months * 4 + Math.floor(days / 7);
}
