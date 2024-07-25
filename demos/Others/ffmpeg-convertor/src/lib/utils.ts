import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = function(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
