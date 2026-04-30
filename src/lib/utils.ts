import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string, locale = "en-US"): string {
  return new Date(date).toLocaleDateString(locale, {
    year:  "numeric",
    month: "long",
    day:   "numeric",
  });
}

export function estimateReadTime(content: string): number {
  return Math.max(1, Math.ceil(content.split(/\s+/).length / 200));
}