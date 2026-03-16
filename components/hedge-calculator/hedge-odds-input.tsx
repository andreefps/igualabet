"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="border-l-[3px] border-l-muted-foreground/30 transition-all duration-200 hover:shadow-md">
      <CardContent className="p-5">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          {t("bet.hedgeOdds")}
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">
              {t("bet.label")}
            </Label>
            <Input
              placeholder={t("bet.teamB")}
              value={hedgeLabel}
              onChange={(e) => onHedgeLabelChange(e.target.value)}
              className="mt-1 h-9 text-sm bg-background"
            />
          </div>
          <div>
            <div className="flex items-center gap-1 mb-1">
              <Label className="text-xs text-muted-foreground">
                {t("tabs.availableOdds")}
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
              value={hedgeOdds}
              onChange={(e) => onHedgeOddsChange(e.target.value)}
              className="h-9 text-sm bg-background"
            />
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/50 text-accent-foreground">
            <Lightbulb className="h-4 w-4 mt-0.5 shrink-0" />
            <p className="text-xs">{t("tabs.optimizerHint")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
