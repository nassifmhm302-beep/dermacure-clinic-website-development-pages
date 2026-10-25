export const RIYADH_TIMEZONE = "Asia/Riyadh";

/** تاريخ اليوم بصيغة YYYY-MM-DD وفق المنطقة الزمنية المركزية */
export function todayInRiyadh(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: RIYADH_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function isValidDateString(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d
  );
}

export function isValidTime(value: string): boolean {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return false;
  return true;
}

/** رقم هاتف سعودي أو دولي */
export function isValidPhone(value: string): boolean {
  const normalized = value.replace(/[\s-]/g, "");
  return /^(?:\+?9665\d{8}|05\d{8}|\d{8,15})$/.test(normalized);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function makeReference(): string {
  const now = new Date();
  const ymd =
    new Intl.DateTimeFormat("en-CA", {
      timeZone: RIYADH_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .format(now)
      .replace(/-/g, "");
  const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DC-${ymd}-${suffix}`;
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
