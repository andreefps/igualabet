import { Card, CardContent } from "@/components/ui/card";
import { Target } from "lucide-react";
import { type HedgeRecommendation } from "@/hooks/use-hedge-calculator";
import { useFormatters } from "@/hooks/use-formatters";
import { useI18n } from "@/hooks/use-i18n";

interface RecommendationResultsProps {
  recommendations: HedgeRecommendation[];
  bet1Label: string;
  hedgeLabel: string;
}

export const RecommendationResults = ({
  recommendations,
  bet1Label,
  hedgeLabel,
}: RecommendationResultsProps) => {
  const { formatCurrency } = useFormatters();
  const { t } = useI18n();

  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        {t("results.recommendations")}
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {recommendations.map((rec, index) => (
          <Card
            key={index}
            className="transition-all duration-200 hover:shadow-md bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{rec.icon}</span>
                  <h4 className="font-medium text-slate-800 dark:text-slate-100">
                    {rec.strategy}
                  </h4>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
                {rec.description}
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {t("results.recommendedStake")}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {formatCurrency(rec.recommendedStake)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded border border-blue-200 dark:border-blue-700">
                    <p className="text-slate-600 dark:text-slate-300">
                      {bet1Label} {t("results.wins")}
                    </p>
                    <p
                      className={`font-semibold ${
                        rec.profit1 >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatCurrency(rec.profit1)}
                    </p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded border border-purple-200 dark:border-purple-700">
                    <p className="text-slate-600 dark:text-slate-300">
                      {hedgeLabel} {t("results.wins")}
                    </p>
                    <p
                      className={`font-semibold ${
                        rec.profit2 >= 0
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formatCurrency(rec.profit2)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
