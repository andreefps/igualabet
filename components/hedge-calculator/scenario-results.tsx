"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-5 animate-fade-in-up">
      {/* Total Stake Summary */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 uppercase tracking-wide">
          <TrendingUp className="h-4 w-4" />
          {t("results.scenarios")}
        </h3>
        <div className="text-sm text-muted-foreground">
          {t("results.totalStake")}:{" "}
          <span className="font-semibold text-foreground">
            {formatCurrency(totalStake)}
          </span>
        </div>
      </div>

      <div
        className={`grid gap-4 ${
          results.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {results.map((result, index) => {
          const isProfit = result.netProfit >= 0;
          const isBest = index === bestIndex && result.netProfit > 0;
          const isBothLose = result.scenario === t("results.bothLose");

          return (
            <Card
              key={index}
              className={`transition-all duration-200 hover:shadow-md group ${
                isBest
                  ? "ring-2 ring-primary/20 border-primary/30"
                  : isBothLose
                    ? "border-destructive/20"
                    : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium">{result.scenario}</h4>
                    {isBest && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0"
                      >
                        {t("results.bestOutcome")}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        isProfit
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          : "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300"
                      } border-0`}
                    >
                      {formatPercentage(result.profitPercentage)}
                    </Badge>
                    <button
                      onClick={() => copyResult(result, index)}
                      className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all"
                      title={t("actions.copy")}
                    >
                      {copiedIndex === index ? (
                        <Check className="h-3 w-3 text-emerald-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("results.return")}
                    </p>
                    <p className="font-medium tabular-nums">
                      {formatCurrency(result.totalReturn)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {t("results.profit")}
                    </p>
                    <p
                      className={`font-medium tabular-nums ${
                        isProfit
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isProfit ? "+" : ""}
                      {formatCurrency(result.netProfit)}
                    </p>
                  </div>
                </div>

                {/* Profit bar */}
                {totalStake > 0 && (
                  <div className="mt-4 h-1.5 rounded-full bg-muted overflow-hidden">
                    {isProfit ? (
                      <div
                        className="h-full bg-emerald-500/60 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((result.netProfit / totalStake) * 100, 100)}%`,
                        }}
                      />
                    ) : (
                      <div
                        className="h-full bg-red-500/60 rounded-full transition-all duration-300 ml-auto"
                        style={{
                          width: `${Math.min((Math.abs(result.netProfit) / totalStake) * 100, 100)}%`,
                        }}
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
