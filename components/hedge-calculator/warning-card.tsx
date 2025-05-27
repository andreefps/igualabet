import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import {
  type CalculationResult,
  type CalculatorMode,
} from "@/hooks/use-hedge-calculator";
import { useI18n } from "@/hooks/use-i18n";

interface WarningCardProps {
  bothLosePossible: boolean;
  mode: CalculatorMode;
  results: CalculationResult[];
}

export const WarningCard = ({
  bothLosePossible,
  mode,
  results,
}: WarningCardProps) => {
  const { t } = useI18n();
  const shouldShow =
    bothLosePossible &&
    mode === "manual" &&
    results.some((r) => r.scenario === "Both Lose");

  if (!shouldShow) return null;

  return (
    <Card className="border-amber-200 dark:border-amber-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800 dark:text-amber-200">
              {t("warning.bothLoseTitle")}
            </p>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              {t("warning.bothLoseDesc")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
