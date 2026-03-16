"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type BetData } from "@/hooks/use-hedge-calculator";
import { type OddsFormat } from "@/hooks/use-odds-converter";
import { useI18n } from "@/hooks/use-i18n";

interface BetInputProps {
  bet: BetData;
  onBetChange: (bet: BetData) => void;
  title: string;
  accent?: "primary" | "secondary";
  oddsFormat: OddsFormat;
  showStake?: boolean;
}

export const BetInput = ({
  bet,
  onBetChange,
  title,
  accent = "primary",
  oddsFormat,
  showStake = true,
}: BetInputProps) => {
  const { t } = useI18n();
  const oddsPlaceholder = oddsFormat === "decimal" ? "1.72" : "-110";
  const tooltipKey =
    oddsFormat === "decimal" ? "tooltip.oddsDecimal" : "tooltip.oddsAmerican";

  const borderClass =
    accent === "primary"
      ? "border-l-primary"
      : "border-l-muted-foreground/30";

  return (
    <Card
      className={`border-l-[3px] ${borderClass} transition-all duration-200 hover:shadow-md`}
    >
      <CardContent className="p-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-5 uppercase tracking-wide">
          {title}
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">
              {t("bet.label")}
            </Label>
            <Input
              placeholder={t("bet.teamA")}
              value={bet.label}
              onChange={(e) => onBetChange({ ...bet, label: e.target.value })}
              className="mt-1.5 h-10 bg-background"
            />
          </div>
          <div
            className={`grid ${showStake ? "grid-cols-2" : "grid-cols-1"} gap-4`}
          >
            <div>
              <div className="flex items-center gap-1 mb-1">
                <Label className="text-xs text-muted-foreground">
                  {t("bet.odds")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground/60 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">{t(tooltipKey)}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                placeholder={oddsPlaceholder}
                value={bet.odds}
                onChange={(e) => onBetChange({ ...bet, odds: e.target.value })}
                className="h-10 bg-background"
              />
            </div>
            {showStake && (
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Label className="text-xs text-muted-foreground">
                    {t("bet.stake")}
                  </Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground/60 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">{t("tooltip.stake")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="100.00"
                  value={bet.stake}
                  onChange={(e) =>
                    onBetChange({ ...bet, stake: e.target.value })
                  }
                  className="h-10 bg-background"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
