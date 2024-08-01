import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function isToday(datetime: number) {
  const givenDate = new Date(datetime * 1000);
  const today = new Date();

  return (
    givenDate.getFullYear() === today.getFullYear() &&
    givenDate.getMonth() === today.getMonth() &&
    givenDate.getDate() === today.getDate()
  );
}

function getWeekday(epochTime: number) {
  if (isToday(epochTime)) return 'Today'
  const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'short' });
  return formatter.format(epochTime * 1000);
}

function getTime(epochTime: number) {
  const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: true });
  return formatter.format(epochTime * 1000);
}


function getTemp(temp: number, unit: string) {
  if (unit === 'imperial') return Math.round((temp - 273.15) * 9 / 5 + 32)
  else return Math.round(temp - 273.15)
}

export { cn, getWeekday, getTime, getTemp };
