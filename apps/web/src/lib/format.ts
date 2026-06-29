export function fmtFollowers(n?: number | null): string {
  if (n == null || n === 0) return "—";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return `${n}`;
}

export const CURRENCY = "KWD" as const;
export const CURRENCY_SYMBOL = "د.ك" as const;
export const LOCALE = "en-KW" as const;
export const FILS_PER_KWD = 1000;

// KWD is a 3-decimal currency. Pass opts.fils=true when amounts are integer fils (×1000); default treats input as KWD units.
export function fmtMoney(
  amount: number,
  opts: { compact?: boolean; locale?: string; fils?: boolean } = {},
): string {
  const locale = opts.locale ?? LOCALE;
  const value = opts.fils ? amount / FILS_PER_KWD : amount;
  return value.toLocaleString(locale, {
    style: "currency",
    currency: CURRENCY,
    currencyDisplay: "narrowSymbol",
    notation: opts.compact ? "compact" : "standard",
    minimumFractionDigits: opts.compact ? 0 : 3,
    maximumFractionDigits: 3,
  });
}

export function fmtPrice(amount: number, opts: { fils?: boolean } = {}): string {
  const value = opts.fils ? amount / FILS_PER_KWD : amount;
  return `${CURRENCY_SYMBOL} ${value.toLocaleString("en-KW", { minimumFractionDigits: 3, maximumFractionDigits: 3 })}`;
}
