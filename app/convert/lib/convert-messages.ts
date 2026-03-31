import { formatBs } from "./convert-format";

export function buildUnifiedDiffText(
  diffVES: number | null,
  unitLabel: string,
): string | null {
  if (diffVES === null) return null;
  if (diffVES === 0) {
    return "Para este monto, el total en bolívares coincide entre la referencia BCV y el precio particular que indicaste.";
  }
  if (diffVES > 0) {
    return `Con el precio particular recibirías ${formatBs(diffVES)} Bs.S más que con la referencia BCV (mismo monto en ${unitLabel}).`;
  }
  return `Con el precio particular recibirías ${formatBs(Math.abs(diffVES))} Bs.S menos que con la referencia BCV (mismo monto en ${unitLabel}).`;
}
