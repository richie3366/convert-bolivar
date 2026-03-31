import type { CurrencySlug } from "@/lib/flow";

export type RatePayload = {
  price: number | null;
  rateLabel: string | null;
  source: string | null;
  date: string | null;
  time: string | null;
  success: boolean;
};

export type RateBundle = {
  currency: CurrencySlug;
  payload: RatePayload | null;
  error: string | null;
};

export type CopiedUnifiedTarget = "bcv" | "private";
