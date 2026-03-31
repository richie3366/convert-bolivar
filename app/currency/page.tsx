import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import BackNav from "@/components/back-nav/back-nav";
import {
  CURRENCIES,
  CURRENCY_CONVERT_MODE,
  currencyPageEyebrow,
  currencyPageHeading,
  isActionSlug,
  isConvertMode,
  isFlowChannel,
  type ActionSlug,
} from "@/lib/flow";
import "./currency.css";
import type { CurrencyPageProps } from "./currency.types";

const UNIFIED_CONVERT_ACTION = "convert-unified" as const satisfies ActionSlug;

const Currency = async ({ searchParams }: CurrencyPageProps) => {
  const { action: actionRaw, channel: channelRaw, mode: modeRaw } =
    await searchParams;

  if (isFlowChannel(channelRaw)) {
    redirect(`/currency?mode=${CURRENCY_CONVERT_MODE}`);
  }

  if (modeRaw !== undefined && isConvertMode(modeRaw)) {
    return (
      <main className="currency relative mx-auto flex min-h-full max-w-lg flex-col gap-8 px-4 pb-10 pt-14">
        <BackNav href="/home">Volver</BackNav>
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          Referencia BCV y precio con un particular
        </p>
        <h1 className="pb-4 text-center text-2xl font-semibold tracking-tight">
          {currencyPageHeading()}
        </h1>
        <ul className="flex flex-col gap-3">
          {CURRENCIES.map(({ slug, label }) => (
            <li key={slug}>
              <Link
                href={`/convert?action=${UNIFIED_CONVERT_ACTION}&currency=${slug}`}
                className={
                  slug === "usd"
                    ? "block rounded-xl border border-neutral-300 px-5 py-4 text-center text-lg font-medium transition bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:outline-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                    : "block rounded-xl border border-neutral-300 px-5 py-4 text-center text-lg font-medium transition bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:outline-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                }
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  const actionParam = actionRaw ?? "";
  if (!isActionSlug(actionParam)) {
    redirect("/home");
  }
  const action: ActionSlug = actionParam;

  return (
    <main className="currency relative mx-auto flex min-h-full max-w-lg flex-col gap-8 px-4 pb-10 pt-14">
      <BackNav href="/home">Volver</BackNav>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        {currencyPageEyebrow(action)}
      </p>
      <h1 className="pb-4 text-center text-2xl font-semibold tracking-tight">
        {currencyPageHeading()}
      </h1>
      <ul className="flex flex-col gap-3">
        {CURRENCIES.map(({ slug, label }) => (
          <li key={slug}>
            <Link
              href={`/convert?action=${action}&currency=${slug}`}
              className="block rounded-xl border border-neutral-300 bg-neutral-50 px-5 py-4 text-center text-lg font-medium transition hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Currency;
