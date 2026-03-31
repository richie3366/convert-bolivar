export type ActionSlug =
  | "buy-bcv"
  | "buy-private"
  | "sell-bcv"
  | "sell-private"
  | "convert-bcv"
  | "convert-private"
  | "convert-unified";

/** Paso previo a elegir moneda: tasa BCV vs particular. */
export type FlowChannel = "bcv" | "private";

export type CurrencySlug = "usd" | "eur";

/** Query en /currency para el flujo unificado comprar/vender (misma conversión). */
export const CURRENCY_CONVERT_MODE = "convert";

export const ACTIONS: { slug: ActionSlug; label: string }[] = [
  { slug: "buy-bcv", label: "Comprar a BCV" },
  { slug: "buy-private", label: "Comprar a un particular" },
  { slug: "sell-bcv", label: "Vender a BCV" },
  { slug: "sell-private", label: "Vender a un particular" },
  { slug: "convert-bcv", label: "Conversión BCV" },
  { slug: "convert-private", label: "Conversión particular" },
  { slug: "convert-unified", label: "Conversión BCV y particular" },
];

export const CURRENCIES: { slug: CurrencySlug; label: string }[] = [
  { slug: "usd", label: "Dólares" },
  { slug: "eur", label: "EUROS" },
];

export function isActionSlug(v: string | null): v is ActionSlug {
  return (
    v === "buy-bcv" ||
    v === "buy-private" ||
    v === "sell-bcv" ||
    v === "sell-private" ||
    v === "convert-bcv" ||
    v === "convert-private" ||
    v === "convert-unified"
  );
}

export function isCurrencySlug(v: string | null): v is CurrencySlug {
  return v === "usd" || v === "eur";
}

export function actionLabel(slug: ActionSlug): string {
  return ACTIONS.find((a) => a.slug === slug)?.label ?? slug;
}

export function isPrivateAction(slug: ActionSlug): boolean {
  return (
    slug === "buy-private" ||
    slug === "sell-private" ||
    slug === "convert-private"
  );
}

export function isConvertFlowAction(slug: ActionSlug): boolean {
  return (
    slug === "convert-bcv" ||
    slug === "convert-private" ||
    slug === "convert-unified"
  );
}

export function isFlowChannel(v: string | null | undefined): v is FlowChannel {
  return v === "bcv" || v === "private";
}

export function isConvertMode(v: string | null | undefined): boolean {
  return v === CURRENCY_CONVERT_MODE;
}

/** Paso de moneda del flujo unificado comprar/vender (BCV + particular). */
export function currencyUnifiedHref(): string {
  return `/currency?mode=${CURRENCY_CONVERT_MODE}`;
}

/** Compatibilidad: mismo destino que `currencyUnifiedHref`. */
export function currencyChannelHref(_channel: FlowChannel): string {
  return currencyUnifiedHref();
}

/** Volver desde /convert al paso de moneda. */
export function currencyStepHref(action: ActionSlug): string {
  if (action === "convert-unified") {
    return currencyUnifiedHref();
  }
  if (
    action === "convert-bcv" ||
    action === "buy-bcv" ||
    action === "sell-bcv"
  ) {
    return currencyUnifiedHref();
  }
  if (
    action === "convert-private" ||
    action === "buy-private" ||
    action === "sell-private"
  ) {
    return currencyUnifiedHref();
  }
  return `/currency?action=${action}`;
}

export function currencyPageEyebrow(action: ActionSlug): string {
  if (isConvertFlowAction(action)) {
    if (action === "convert-unified") return "BCV y particular";
    return action === "convert-bcv" ? "BCV" : "Particular";
  }
  const buy = action.startsWith("buy");
  const verb = buy ? "Comprar" : "Vender";
  const ctx = isPrivateAction(action) ? "Particular" : "BCV";
  return `${verb} · ${ctx}`;
}

export function currencyPageHeading(): string {
  return "¿En qué moneda?";
}

export function convertPageEyebrow(
  action: ActionSlug,
  unitLabel: string,
): string {
  if (action === "convert-unified") {
    return `BCV y particular · ${unitLabel}`;
  }
  if (action === "convert-bcv") {
    return `BCV · ${unitLabel}`;
  }
  if (action === "convert-private") {
    return `Particular · ${unitLabel}`;
  }
  const buy = action.startsWith("buy");
  const verb = buy ? "Comprar" : "Vender";
  const ctx = isPrivateAction(action) ? "Particular" : "BCV";
  return `${verb} · ${ctx} · ${unitLabel}`;
}

export function convertPageHeading(): string {
  return "¿Cuánto quieres convertir?";
}
