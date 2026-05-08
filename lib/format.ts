// lib/format.ts

/** Formata valor em Real brasileiro — ex: R$ 1.234,56 */
export function formatCurrency(
  value: number | string,
  options?: Intl.NumberFormatOptions
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    ...options,
  }).format(num);
}

/** Formata número compacto — ex: 1.2k, 3.4M */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

/** Formata percentual — ex: 12,5% */
export function formatPercent(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}