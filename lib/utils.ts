import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextMonday(date: Date = new Date()): Date {
  const japanTime = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }))
  const day = japanTime.getDay()
  const diff = day === 0 ? 1 : day === 1 ? 0 : 8 - day // Sunday: +1, Monday: +0, other days: days until next Monday
  japanTime.setDate(japanTime.getDate() + diff)
  japanTime.setHours(0, 0, 0, 0)
  return new Date(japanTime.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }))
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

