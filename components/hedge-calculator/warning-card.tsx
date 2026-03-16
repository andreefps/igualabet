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
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-warning/8 border border-warning/15 animate-fade-in-up">
      <div className="w-8 h-8 rounded-lg bg-warning/15 flex items-center justify-center shrink-0">
        <AlertTriangle className="h-4 w-4 text-warning" />
      </div>
      <div>
        <p className="text-sm font-semibold text-warning-foreground">
          {t("warning.bothLoseTitle")}
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          {t("warning.bothLoseDesc")}
        </p>
      </div>
    </div>
  );
};
