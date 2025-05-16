import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date for display
export const formatDate = (date: Date | null) => {
  if (!date) return "";
  return format(date, "EEEE, MMMM d, yyyy");
};
