export function isWeekend(date: Date = new Date()): boolean {
  const day = date.getDay()
  return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
}

export function getNextMonday(date: Date = new Date()): Date {
  const result = new Date(date)
  result.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7))
  result.setHours(0, 0, 0, 0)
  return result
}

export function calculateCompoundInterest(principal: number, rate: number, days: number): number {
  return principal * Math.pow(1 + rate / 365, days)
}

