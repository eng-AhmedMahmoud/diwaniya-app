import { cookies } from "next/headers";

export const CURRENCY = "KWD" as const;
export const CURRENCY_SYMBOL = "د.ك" as const;
export const TIMEZONE = "Asia/Kuwait" as const;

export type Locale = "en" | "ar";

const INTL_LOCALE: Record<Locale, string> = {
  en: "en-KW",
  ar: "ar-KW",
};

export async function getLocale(): Promise<Locale> {
  const v = (await cookies()).get("locale")?.value;
  return v === "ar" ? "ar" : "en";
}

// KWD is 3-decimal. Pass opts.fils=true when amounts are integer fils (×1000); default treats input as KWD units.
export function fmtMoney(amount?: number | null, locale: Locale = "en", opts: { fils?: boolean } = {}): string {
  if (amount == null) return "—";
  const value = opts.fils ? amount / 1000 : amount;
  return value.toLocaleString(INTL_LOCALE[locale], {
    style: "currency",
    currency: CURRENCY,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}

export function fmtNum(n?: number | null, locale: Locale = "en"): string {
  if (n == null) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toLocaleString(INTL_LOCALE[locale], { maximumFractionDigits: 1 })}M`;
  if (n >= 1_000) return `${(n / 1_000).toLocaleString(INTL_LOCALE[locale], { maximumFractionDigits: 1 })}k`;
  return n.toLocaleString(INTL_LOCALE[locale]);
}

export function fmtDate(s?: string | null, locale: Locale = "en"): string {
  if (!s) return "—";
  return new Date(s).toLocaleString(INTL_LOCALE[locale], { timeZone: TIMEZONE });
}

const RTF_CACHE: Partial<Record<Locale, Intl.RelativeTimeFormat>> = {};
function rtf(locale: Locale) {
  return (RTF_CACHE[locale] ??= new Intl.RelativeTimeFormat(INTL_LOCALE[locale], { numeric: "auto" }));
}

export function fmtAgo(s?: string | null, locale: Locale = "en"): string {
  if (!s) return "—";
  const sec = Math.floor((Date.now() - new Date(s).getTime()) / 1000);
  if (sec < 60) return rtf(locale).format(-sec, "second");
  if (sec < 3600) return rtf(locale).format(-Math.floor(sec / 60), "minute");
  if (sec < 86_400) return rtf(locale).format(-Math.floor(sec / 3600), "hour");
  return rtf(locale).format(-Math.floor(sec / 86_400), "day");
}
