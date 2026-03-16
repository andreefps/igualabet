"use client";

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
    results.some((r) => r.scenario === t("results.bothLose"));

  if (!shouldShow) return null;

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-warning/10 border border-warning/20 animate-fade-in-up">
      <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-medium text-warning-foreground">
          {t("warning.bothLoseTitle")}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {t("warning.bothLoseDesc")}
        </p>
      </div>
    </div>
  );
};
