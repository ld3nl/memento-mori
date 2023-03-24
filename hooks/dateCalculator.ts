export function calculateAgeAndLivedWeeksAndDays(birthDateString: Date): {
  ageLived: string;
  livedWeeksAndDays: string;
} {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  let ageInYears = today.getFullYear() - birthDate.getFullYear();
  let ageInMonths = today.getMonth() + 1 - (birthDate.getMonth() + 1);
  const ageInDays = today.getDate() - birthDate.getDate();

  if (
    ageInMonths < 0 ||
    (ageInMonths === 0 && today.getDate() < birthDate.getDate())
  ) {
    ageInYears--;
    ageInMonths += 12;
  }

  const totalLivedDays = Math.floor(
    (today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalLivedWeeks = Math.floor(totalLivedDays / 7);
  const livedWeeks = totalLivedWeeks % 52;
  const livedDays = totalLivedDays % 7;

  return {
    ageLived: `${ageInYears} years, ${ageInMonths} months, and ${ageInDays} days`,
    livedWeeksAndDays: `${livedWeeks} weeks and ${livedDays} days`,
  };
}

export function calculateWeeksSinceBirth(birthDateString: Date): number {
  const birthDate = new Date(birthDateString);
  const today = new Date();
  const diffTime = today.getTime() - birthDate.getTime();
  const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
  return diffWeeks;
}
