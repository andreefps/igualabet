import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { type CalculationResult } from "@/hooks/use-hedge-calculator";
import { useFormatters } from "@/hooks/use-formatters";
import { useI18n } from "@/hooks/use-i18n";

interface ScenarioResultsProps {
  results: CalculationResult[];
}

export const ScenarioResults = ({ results }: ScenarioResultsProps) => {
  const { formatCurrency, formatPercentage } = useFormatters();
  const { t } = useI18n();

  if (results.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        {t("results.scenarios")}
      </h3>
      <div
        className={`grid gap-4 ${
          results.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
      >
        {results.map((result, index) => (
          <Card
            key={index}
            className={`transition-all duration-200 hover:shadow-md ${
              result.scenario === "Both Lose"
                ? "border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20"
                : result.netProfit >= 0
                ? "border-emerald-200 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/20"
                : "border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-slate-800 dark:text-slate-100">
                  {result.scenario === "Both Lose"
                    ? t("results.bothLose")
                    : result.scenario}
                </h4>
                <Badge
                  variant={result.netProfit >= 0 ? "default" : "destructive"}
                  className={
                    result.netProfit >= 0
                      ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/50"
                      : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-900/50"
                  }
                >
                  {formatPercentage(result.profitPercentage)}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t("results.return")}
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {formatCurrency(result.totalReturn)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t("results.profit")}
                  </p>
                  <p
                    className={`font-semibold ${
                      result.netProfit >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatCurrency(result.netProfit)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
