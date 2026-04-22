"use client";

import { useCallback, useMemo, useState } from "react";
import {
  isPrivateAction,
  type ActionSlug,
  type CurrencySlug,
} from "@/lib/flow";
import { formatBsPlain, formatFiatPlain } from "../lib/convert-format";
import { buildUnifiedDiffText } from "../lib/convert-messages";
import { parseAmount, parseRate } from "../lib/convert-parsing";
import { CURRENCY_UNIT } from "../types/convert.constants";
import type { CopiedUnifiedTarget, RatePayload } from "../types/convert.types";

type UseConvertFormArgs = {
  action: ActionSlug | null;
  currency: CurrencySlug | null;
  bcvRate: RatePayload | null;
  rateError: string | null;
  loadingRate: boolean;
};

export function useConvertForm({
  action,
  currency,
  bcvRate,
  rateError,
  loadingRate,
}: UseConvertFormArgs) {
  const [amount, setAmount] = useState("");
  const [privateRateInput, setPrivateRateInput] = useState("");
  const [copiedBsHint, setCopiedBsHint] = useState(false);
  const [copiedUnified, setCopiedUnified] = useState<CopiedUnifiedTarget | null>(
    null,
  );

  const isUnified = action === "convert-unified";
  const isVesToFiat = action === "convert-bcv-from-ves";
  const isPrivate = action !== null && isPrivateAction(action);
  const showPrivateField = isPrivate || isUnified;

  const refPrice = bcvRate?.price ?? null;
  const privateRate = showPrivateField ? parseRate(privateRateInput) : null;

  const effectiveRate = isUnified
    ? null
    : isPrivate
      ? privateRate
      : refPrice;

  const amountN = parseAmount(amount);
  const result =
    !isUnified && amountN !== null
      ? isVesToFiat
        ? refPrice !== null && refPrice > 0
          ? amountN / refPrice
          : null
        : effectiveRate !== null
          ? amountN * effectiveRate
          : null
      : null;

  const resultBcv =
    isUnified && amountN !== null && refPrice !== null
      ? amountN * refPrice
      : null;
  const resultPrivate =
    isUnified && amountN !== null && privateRate !== null
      ? amountN * privateRate
      : null;
  const diffVES =
    isUnified && resultBcv !== null && resultPrivate !== null
      ? resultPrivate - resultBcv
      : null;
  const diffPct =
    diffVES !== null && resultBcv !== null && resultBcv !== 0
      ? (diffVES / resultBcv) * 100
      : null;

  const unitLabel =
    currency !== null ? CURRENCY_UNIT[currency] : ("USD" as const);

  const unifiedDiffText = useMemo(
    () => buildUnifiedDiffText(diffVES, unitLabel),
    [diffVES, unitLabel],
  );

  const copyConvertedBs = useCallback(async () => {
    if (result === null) return;
    try {
      const text = isVesToFiat
        ? formatFiatPlain(result, unitLabel)
        : formatBsPlain(result);
      await navigator.clipboard.writeText(text);
      setCopiedBsHint(true);
      window.setTimeout(() => setCopiedBsHint(false), 2000);
    } catch {
      // Sin permiso o contexto no seguro
    }
  }, [isVesToFiat, result, unitLabel]);

  const copyUnifiedBs = useCallback(
    async (which: CopiedUnifiedTarget, value: number) => {
      try {
        await navigator.clipboard.writeText(formatBsPlain(value));
        setCopiedUnified(which);
        window.setTimeout(() => setCopiedUnified(null), 2000);
      } catch {
        // Sin permiso o contexto no seguro
      }
    },
    [],
  );

  return {
    amount,
    setAmount,
    privateRateInput,
    setPrivateRateInput,
    copiedBsHint,
    copiedUnified,
    isUnified,
    isVesToFiat,
    isPrivate,
    showPrivateField,
    refPrice,
    privateRate,
    effectiveRate,
    amountN,
    result,
    resultBcv,
    resultPrivate,
    diffVES,
    diffPct,
    unitLabel,
    unifiedDiffText,
    rateError,
    loadingRate,
    copyConvertedBs,
    copyUnifiedBs,
  };
}
