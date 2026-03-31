"use client";

import { useEffect, useState } from "react";
import type { CurrencySlug } from "@/lib/flow";
import type { RateBundle, RatePayload } from "../types/convert.types";

export function useBcvRate(currency: CurrencySlug | null): {
  bcvRate: RatePayload | null;
  rateError: string | null;
  loadingRate: boolean;
} {
  const [rateBundle, setRateBundle] = useState<RateBundle | null>(null);

  useEffect(() => {
    if (!currency) return;
    let cancelled = false;
    fetch(`/api/rate/${currency}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("fetch");
        return res.json() as Promise<RatePayload>;
      })
      .then((data) => {
        if (!cancelled) {
          setRateBundle({ currency, payload: data, error: null });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setRateBundle({
            currency,
            payload: null,
            error: "No se pudo cargar la tasa del día.",
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [currency]);

  const rateReady =
    rateBundle !== null && rateBundle.currency === currency;
  const bcvRate = rateReady ? rateBundle.payload : null;
  const rateError = rateReady ? rateBundle.error : null;
  const loadingRate = currency !== null && !rateReady;

  return { bcvRate, rateError, loadingRate };
}
