"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
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

  const isPrimary = accent === "primary";

  return (
    <div
      className={`relative rounded-2xl border bg-card p-7 transition-all duration-300 hover:shadow-lg ${
        isPrimary
          ? "gradient-border"
          : "border-border hover:border-muted-foreground/30"
      }`}
    >
      {/* Accent dot */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            isPrimary ? "bg-primary" : "bg-muted-foreground/40"
          }`}
        />
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {title}
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-xs font-medium text-muted-foreground/80 mb-2 block">
            {t("bet.label")}
          </Label>
          <Input
            placeholder={t("bet.teamA")}
            value={bet.label}
            onChange={(e) => onBetChange({ ...bet, label: e.target.value })}
            className="h-11 bg-background/60 border-border/60 focus:bg-background transition-colors"
          />
        </div>
        <div
          className={`grid ${showStake ? "grid-cols-2" : "grid-cols-1"} gap-4`}
        >
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Label className="text-xs font-medium text-muted-foreground/80">
                {t("bet.odds")}
              </Label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-3 w-3 text-muted-foreground/40 cursor-help hover:text-muted-foreground transition-colors" />
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
              className="h-11 bg-background/60 border-border/60 font-mono text-[15px] focus:bg-background transition-colors"
            />
          </div>
          {showStake && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Label className="text-xs font-medium text-muted-foreground/80">
                  {t("bet.stake")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3 w-3 text-muted-foreground/40 cursor-help hover:text-muted-foreground transition-colors" />
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
                className="h-11 bg-background/60 border-border/60 font-mono text-[15px] focus:bg-background transition-colors"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
