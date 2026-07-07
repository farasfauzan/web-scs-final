import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to conditionally join and merge Tailwind CSS classes.
 * It prevents class conflicts (e.g., merging 'p-4' and 'p-8' will correctly output 'p-8').
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}