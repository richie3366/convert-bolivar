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
