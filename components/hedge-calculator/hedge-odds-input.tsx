"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Lightbulb } from "lucide-react";
import { type OddsFormat } from "@/hooks/use-odds-converter";
import { useI18n } from "@/hooks/use-i18n";

interface HedgeOddsInputProps {
  hedgeOdds: string;
  hedgeLabel: string;
  onHedgeOddsChange: (value: string) => void;
  onHedgeLabelChange: (value: string) => void;
  oddsFormat: OddsFormat;
}

export const HedgeOddsInput = ({
  hedgeOdds,
  hedgeLabel,
  onHedgeOddsChange,
  onHedgeLabelChange,
  oddsFormat,
}: HedgeOddsInputProps) => {
  const { t } = useI18n();
  const oddsPlaceholder = oddsFormat === "decimal" ? "2.85" : "+185";
  const tooltipKey =
    oddsFormat === "decimal" ? "tooltip.oddsDecimal" : "tooltip.oddsAmerican";

  return (
    <div className="relative rounded-2xl border border-border hover:border-muted-foreground/30 bg-card p-7 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          {t("bet.hedgeOdds")}
        </h3>
      </div>

      <div className="space-y-5">
        <div>
          <Label className="text-xs font-medium text-muted-foreground/80 mb-2 block">
            {t("bet.label")}
          </Label>
          <Input
            placeholder={t("bet.teamB")}
            value={hedgeLabel}
            onChange={(e) => onHedgeLabelChange(e.target.value)}
            className="h-11 bg-background/60 border-border/60 focus:bg-background transition-colors"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Label className="text-xs font-medium text-muted-foreground/80">
              {t("tabs.availableOdds")}
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
            value={hedgeOdds}
            onChange={(e) => onHedgeOddsChange(e.target.value)}
            className="h-11 bg-background/60 border-border/60 font-mono text-[15px] focus:bg-background transition-colors"
          />
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/40 border border-accent/60">
          <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-accent-foreground/70" />
          <p className="text-xs text-accent-foreground/80 leading-relaxed">
            {t("tabs.optimizerHint")}
          </p>
        </div>
      </div>
    </div>
  );
};
