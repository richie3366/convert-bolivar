"use client";

import BackNav from "@/components/back-nav/back-nav";
import {
  convertPageEyebrow,
  convertPageHeading,
  currencyStepHref,
} from "@/lib/flow";
import { useBcvRate } from "./hooks/use-bcv-rate";
import { useConvertForm } from "./hooks/use-convert-form";
import { useConvertRouteParams } from "./hooks/use-convert-route-params";
import { formatBs, formatPctSigned } from "./lib/convert-format";

export default function ConvertClient() {
  const { action, currency } = useConvertRouteParams();
  const { bcvRate, rateError, loadingRate } = useBcvRate(currency);

  const form = useConvertForm({
    action,
    currency,
    bcvRate,
    rateError,
    loadingRate,
  });

  if (action === null || currency === null) {
    return null;
  }

  const {
    amount,
    setAmount,
    privateRateInput,
    setPrivateRateInput,
    copiedBsHint,
    copiedUnified,
    isUnified,
    isPrivate,
    showPrivateField,
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
    rateError: rateErr,
    loadingRate: loading,
    copyConvertedBs,
    copyUnifiedBs,
  } = form;

  const inputSuffixClass =
    unitLabel === "USD"
      ? "border-neutral-200 text-neutral-400 bg-emerald-600 dark:border-neutral-600 dark:text-neutral-500"
      : "border-neutral-200 text-neutral-400 bg-indigo-600 dark:border-neutral-600 dark:text-neutral-500";

  return (
    <main className="convert relative mx-auto flex min-h-full max-w-3xl flex-col gap-8 px-4 pb-10 pt-14">
      <BackNav href={currencyStepHref(action)}>Volver</BackNav>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        {convertPageEyebrow(action, unitLabel)}
      </p>
      <h1 className="pb-4 text-center text-2xl font-semibold tracking-tight">
        {convertPageHeading()}
      </h1>

      <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
        <div
          className={
            isUnified
              ? "flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
              : undefined
          }
        >
          <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium">
            Monto en {unitLabel}
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                autoComplete="off"
                placeholder="Ej. 150"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                aria-label={`Monto en ${unitLabel}`}
                className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-3 pr-[3.25rem] text-right text-lg tabular-nums dark:border-neutral-600 dark:bg-neutral-950"
              />
              <span
                className={`pointer-events-none absolute inset-y-0 right-0 flex items-center border-l pl-2 pr-2.5 text-[0.7rem] font-medium uppercase tracking-wide text-white ${inputSuffixClass}`}
                aria-hidden
              >
                {unitLabel}
              </span>
            </div>
          </label>

          {isUnified ? (
            <div className="flex shrink-0 flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 dark:border-neutral-600 dark:bg-neutral-900 sm:min-w-[11rem]">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Con referencia BCV
              </span>
              {loading ? (
                <span className="text-sm text-neutral-400">…</span>
              ) : rateErr ? (
                <span className="text-sm text-neutral-400">—</span>
              ) : resultBcv === null ? (
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  Escribí un monto
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => void copyUnifiedBs("bcv", resultBcv)}
                  className="text-left transition hover:opacity-80"
                  aria-label="Copiar total en bolívares según BCV"
                >
                  <span className="text-lg font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                    ≈ {formatBs(resultBcv)} Bs.S
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">
                    {copiedUnified === "bcv" ? "Copiado" : "Toca para copiar"}
                  </span>
                </button>
              )}
            </div>
          ) : null}
        </div>

        {isUnified && rateErr ? (
          <p className="text-sm text-red-600 dark:text-red-400">{rateErr}</p>
        ) : null}

        {showPrivateField ? (
          <div
            className={
              isUnified
                ? "flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
                : undefined
            }
          >
            <label className="flex min-w-0 flex-1 flex-col gap-2 text-sm font-medium">
              Precio del particular (VES por 1 {unitLabel})
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="Ej. 480"
                  value={privateRateInput}
                  onChange={(e) => setPrivateRateInput(e.target.value)}
                  aria-label={`Precio en VES por 1 ${unitLabel}`}
                  className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-3 pr-[3rem] text-right text-lg tabular-nums dark:border-neutral-600 dark:bg-neutral-950"
                />
                <span
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center border-l border-neutral-200 pl-2 pr-2.5 text-[0.7rem] font-medium uppercase tracking-wide text-neutral-400 dark:border-neutral-600 dark:text-neutral-500"
                  aria-hidden
                >
                  VES
                </span>
              </div>
            </label>

            {isUnified ? (
              <div className="flex shrink-0 flex-col gap-1 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 dark:border-neutral-600 dark:bg-neutral-900 sm:min-w-[11rem]">
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  Con precio particular
                </span>
                {!privateRateInput.trim() || privateRate === null ? (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Indicá la tasa
                  </span>
                ) : resultPrivate === null ? (
                  <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    Monto inválido
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => void copyUnifiedBs("private", resultPrivate)}
                    className="text-left transition hover:opacity-80"
                    aria-label="Copiar total en bolívares según precio particular"
                  >
                    <span className="text-lg font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
                      ≈ {formatBs(resultPrivate)} Bs.S
                    </span>
                    <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">
                      {copiedUnified === "private"
                        ? "Copiado"
                        : "Toca para copiar"}
                    </span>
                  </button>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        {isUnified && unifiedDiffText ? (
          <div
            className="rounded-xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3 text-sm leading-relaxed text-emerald-950 dark:border-emerald-800/60 dark:bg-emerald-950/30 dark:text-emerald-50"
            role="status"
          >
            <p className="font-medium text-emerald-900 dark:text-emerald-100">
              Diferencia entre ambas conversiones
            </p>
            <p className="mt-1.5 text-emerald-900/90 dark:text-emerald-100/90">
              {unifiedDiffText}
            </p>
            {diffPct !== null && diffVES !== 0 ? (
              <p className="mt-2 text-xs text-emerald-800/85 dark:text-emerald-200/80">
                Sobre el total BCV, eso es aproximadamente{" "}
                {formatPctSigned(diffPct)} %.
              </p>
            ) : null}
          </div>
        ) : null}

        {!isUnified ? (
          <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900">
            {loading ? (
              <p className="text-neutral-500">Cargando tasa del día…</p>
            ) : rateErr ? (
              <p className="text-red-600 dark:text-red-400">{rateErr}</p>
            ) : isPrivate &&
              (!privateRateInput.trim() || privateRate === null) ? (
              <p className="text-neutral-600 dark:text-neutral-400">
                Indica el precio acordado con el particular para ver el total en
                bolívares.
              </p>
            ) : result === null ? (
              <p className="text-neutral-600 dark:text-neutral-400">
                Escribe un monto válido para ver la conversión al instante.
              </p>
            ) : (
              <div className="text-lg text-neutral-800 dark:text-neutral-100">
                <span className="block text-sm font-normal text-neutral-500">
                  {amountN} {unitLabel} × {formatBs(effectiveRate!)} VES
                </span>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    ≈
                  </span>
                  <button
                    type="button"
                    onClick={() => void copyConvertedBs()}
                    className="inline-flex min-h-[2.75rem] flex-col items-start justify-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-left shadow-sm transition hover:border-[#15803d] hover:bg-emerald-50/60 active:scale-[0.99] dark:border-neutral-600 dark:bg-neutral-950 dark:hover:border-green-500 dark:hover:bg-emerald-950/25"
                    aria-label="Copiar monto en bolívares"
                  >
                    <span className="font-semibold tabular-nums">
                      {formatBs(result)} Bs.S
                    </span>
                    <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">
                      {copiedBsHint
                        ? "Copiado al portapapeles"
                        : "Toca para copiar"}
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </main>
  );
}
