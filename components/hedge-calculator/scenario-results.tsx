"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, TrendingUp } from "lucide-react";
import { type CalculationResult } from "@/hooks/use-hedge-calculator";
import { useFormatters } from "@/hooks/use-formatters";
import { useI18n } from "@/hooks/use-i18n";

interface ScenarioResultsProps {
  results: CalculationResult[];
  totalStake: number;
}

export const ScenarioResults = ({
  results,
  totalStake,
}: ScenarioResultsProps) => {
  const { formatCurrency, formatPercentage } = useFormatters();
  const { t } = useI18n();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (results.length === 0) return null;

  const bestIndex = results.reduce(
    (best, r, i) => (r.netProfit > results[best].netProfit ? i : best),
    0
  );

  const copyResult = async (result: CalculationResult, index: number) => {
    const text = `${result.scenario}: Return ${formatCurrency(result.totalReturn)}, Profit ${formatCurrency(result.netProfit)} (${formatPercentage(result.profitPercentage)})`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            {t("results.scenarios")}
          </h3>
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          {t("results.totalStake")}:{" "}
          <span className="font-mono text-foreground">
            {formatCurrency(totalStake)}
          </span>
        </div>
      </div>

      <div
        className={`grid gap-5 stagger-children ${
          results.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        }`}
      >
        {results.map((result, index) => {
          const isProfit = result.netProfit >= 0;
          const isBest = index === bestIndex && result.netProfit > 0;
          const isBothLose = result.scenario === t("results.bothLose");

          return (
            <div
              key={index}
              className={`group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg ${
                isBest
                  ? "gradient-border glow-primary"
                  : isBothLose
                    ? "border-destructive/20 hover:border-destructive/40"
                    : "border-border hover:border-muted-foreground/30"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="space-y-1.5">
                  <h4 className="font-semibold text-[15px]">{result.scenario}</h4>
                  {isBest && (
                    <Badge className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-0 font-semibold">
                      {t("results.bestOutcome")}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`text-xs font-mono font-semibold border-0 ${
                      isProfit
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatPercentage(result.profitPercentage)}
                  </Badge>
                  <button
                    onClick={() => copyResult(result, index)}
                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all duration-200"
                    title={t("actions.copy")}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </div>

              {/* Data */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <p className="text-[11px] text-muted-foreground/70 uppercase tracking-wider mb-1">
                    {t("results.return")}
                  </p>
                  <p className="text-lg font-semibold font-mono">
                    {formatCurrency(result.totalReturn)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground/70 uppercase tracking-wider mb-1">
                    {t("results.profit")}
                  </p>
                  <p
                    className={`text-lg font-semibold font-mono ${
                      isProfit
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {isProfit ? "+" : ""}
                    {formatCurrency(result.netProfit)}
                  </p>
                </div>
              </div>

              {/* Profit bar */}
              {totalStake > 0 && (
                <div className="mt-5 h-1.5 rounded-full bg-muted/60 overflow-hidden">
                  {isProfit ? (
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((result.netProfit / totalStake) * 100, 100)}%`,
                      }}
                    />
                  ) : (
                    <div
                      className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-500 ml-auto"
                      style={{
                        width: `${Math.min((Math.abs(result.netProfit) / totalStake) * 100, 100)}%`,
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
