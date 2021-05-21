export function formatCurrency(
  amount: number,
  maxDecimals?: number,
  currency = 'usd',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: maxDecimals,
  }).format(amount);
}

export function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}
