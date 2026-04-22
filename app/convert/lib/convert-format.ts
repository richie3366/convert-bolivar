export function formatPctSigned(n: number): string {
  return new Intl.NumberFormat("es-VE", {
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  }).format(n);
}

export function formatBs(n: number): string {
  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/** Mismo estilo que en pantalla pero sin separador de miles (p. ej. portapapeles). */
export function formatBsPlain(n: number): string {
  return new Intl.NumberFormat("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(n);
}

export function formatFiat(n: number, unit: "USD" | "EUR"): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: unit,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/** Mismo estilo que en pantalla pero sin agrupación (portapapeles). */
export function formatFiatPlain(n: number, unit: "USD" | "EUR"): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: unit,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(n);
}
