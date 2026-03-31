"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import {
  isActionSlug,
  isCurrencySlug,
  type ActionSlug,
  type CurrencySlug,
} from "@/lib/flow";

export function useConvertRouteParams(): {
  action: ActionSlug | null;
  currency: CurrencySlug | null;
} {
  const router = useRouter();
  const searchParams = useSearchParams();
  const actionRaw = searchParams.get("action");
  const currencyRaw = searchParams.get("currency");

  const action = useMemo((): ActionSlug | null => {
    return isActionSlug(actionRaw) ? actionRaw : null;
  }, [actionRaw]);

  const currency = useMemo((): CurrencySlug | null => {
    return isCurrencySlug(currencyRaw) ? currencyRaw : null;
  }, [currencyRaw]);

  useEffect(() => {
    if (action === null || currency === null) {
      router.replace("/home");
    }
  }, [action, currency, router]);

  return { action, currency };
}
