function timeLeft(
  date: string | Date,
  unit: "minutes" | "hours" | "days" = "days"
): number {
  const _date = new Date(date);
  const today = new Date();
  const minisecsDifference = _date.getTime() - today.getTime();

  const units: Record<"minutes" | "hours" | "days", number> = {
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
  };

  const differenceInUnits = Math.round(minisecsDifference / units[unit]);

  return differenceInUnits;
}

export const daysLeft = (date: string | Date) => timeLeft(date, "days");
export const hoursLeft = (date: string | Date) => timeLeft(date, "hours");
export const minutesLeft = (date: string | Date) => timeLeft(date, "minutes");

export const isPast = (date: string | Date): boolean => {
  const _date = new Date(date);
  const today = new Date();
  return _date.getTime() < today.getTime();
};

export default timeLeft;
