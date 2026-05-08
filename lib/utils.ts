// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
/** Merge de classes Tailwind sem conflito */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}