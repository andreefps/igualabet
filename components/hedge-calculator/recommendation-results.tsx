"use client";

import { useState } from "react";
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
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Target className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {t("results.recommendations")}
        </h3>
      </div>

      <div className="grid gap-5 lg:grid-cols-3 stagger-children">
        {recommendations.map((rec, index) => {
          const isBest = index === bestIndex;

          return (
            <div
              key={index}
              className={`group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg ${
                isBest
                  ? "gradient-border glow-primary"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-primary">
                    {iconMap[rec.icon] || <Target className="h-4 w-4" />}
                  </span>
                  <h4 className="font-semibold text-[15px]">{rec.strategy}</h4>
                </div>
                <div className="flex items-center gap-1.5">
                  {isBest && (
                    <Badge className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border-0 font-semibold">
                      {t("results.recommended")}
                    </Badge>
                  )}
                  <button
                    onClick={() => copyRecommendation(rec, index)}
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

              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                {rec.description}
              </p>

              {/* Recommended stake */}
              <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-border/60">
                <span className="text-[11px] text-muted-foreground/70 uppercase tracking-wider">
                  {t("results.recommendedStake")}
                </span>
                <span className="font-semibold font-mono text-base">
                  {formatCurrency(rec.recommendedStake)}
                </span>
              </div>

              {/* Outcomes */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-secondary/40">
                  <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider truncate mb-1">
                    {bet1Label} {t("results.wins")}
                  </p>
                  <p
                    className={`text-base font-semibold font-mono ${
                      rec.profit1 >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {rec.profit1 >= 0 ? "+" : ""}
                    {formatCurrency(rec.profit1)}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-secondary/40">
                  <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider truncate mb-1">
                    {hedgeLabel} {t("results.wins")}
                  </p>
                  <p
                    className={`text-base font-semibold font-mono ${
                      rec.profit2 >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {rec.profit2 >= 0 ? "+" : ""}
                    {formatCurrency(rec.profit2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
