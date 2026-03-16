"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Target, Shield, Scale } from "lucide-react";
import { type HedgeRecommendation } from "@/hooks/use-hedge-calculator";
import { useFormatters } from "@/hooks/use-formatters";
import { useI18n } from "@/hooks/use-i18n";

interface RecommendationResultsProps {
  recommendations: HedgeRecommendation[];
  bet1Label: string;
  hedgeLabel: string;
}

const iconMap: Record<string, React.ReactNode> = {
  guaranteed: <Target className="h-4 w-4" />,
  breakeven: <Scale className="h-4 w-4" />,
  minimize: <Shield className="h-4 w-4" />,
};

export const RecommendationResults = ({
  recommendations,
  bet1Label,
  hedgeLabel,
}: RecommendationResultsProps) => {
  const { formatCurrency } = useFormatters();
  const { t } = useI18n();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (recommendations.length === 0) return null;

  // Best = highest minimum profit (best worst-case)
  const bestIndex = recommendations.reduce((best, rec, i) => {
    const worstCase = Math.min(rec.profit1, rec.profit2);
    const bestWorstCase = Math.min(
      recommendations[best].profit1,
      recommendations[best].profit2
    );
    return worstCase > bestWorstCase ? i : best;
  }, 0);

  const copyRecommendation = async (
    rec: HedgeRecommendation,
    index: number
  ) => {
    const text = `${rec.strategy}: Stake ${formatCurrency(rec.recommendedStake)}, ${bet1Label} wins: ${formatCurrency(rec.profit1)}, ${hedgeLabel} wins: ${formatCurrency(rec.profit2)}`;
    await navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-5 animate-fade-in-up">
      <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2 px-1 uppercase tracking-wide">
        <Target className="h-4 w-4" />
        {t("results.recommendations")}
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.map((rec, index) => {
          const isBest = index === bestIndex;

          return (
            <Card
              key={index}
              className={`transition-all duration-200 hover:shadow-md group ${
                isBest ? "ring-2 ring-primary/20 border-primary/30" : ""
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">
                      {iconMap[rec.icon] || <Target className="h-4 w-4" />}
                    </span>
                    <h4 className="text-sm font-medium">{rec.strategy}</h4>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isBest && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-0"
                      >
                        {t("results.recommended")}
                      </Badge>
                    )}
                    <button
                      onClick={() => copyRecommendation(rec, index)}
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

                <p className="text-xs text-muted-foreground mb-4">
                  {rec.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-xs text-muted-foreground">
                      {t("results.recommendedStake")}
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatCurrency(rec.recommendedStake)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground truncate">
                        {bet1Label} {t("results.wins")}
                      </p>
                      <p
                        className={`text-sm font-medium tabular-nums ${
                          rec.profit1 >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {rec.profit1 >= 0 ? "+" : ""}
                        {formatCurrency(rec.profit1)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-[10px] text-muted-foreground truncate">
                        {hedgeLabel} {t("results.wins")}
                      </p>
                      <p
                        className={`text-sm font-medium tabular-nums ${
                          rec.profit2 >= 0
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {rec.profit2 >= 0 ? "+" : ""}
                        {formatCurrency(rec.profit2)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
