"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { type OddsFormat } from "@/hooks/use-odds-converter";
import { useI18n } from "@/hooks/use-i18n";

interface SettingsBarProps {
  oddsFormat: OddsFormat;
  onOddsFormatChange: (format: OddsFormat) => void;
  bothLosePossible: boolean;
  onBothLosePossibleChange: (value: boolean) => void;
}

export const SettingsBar = ({
  oddsFormat,
  onOddsFormatChange,
  bothLosePossible,
  onBothLosePossibleChange,
}: SettingsBarProps) => {
  const { t } = useI18n();

  return (
    <div className="flex flex-wrap items-center gap-6 mb-6">
      <div className="flex items-center gap-2">
        <Label className="text-sm text-muted-foreground">
          {t("settings.oddsFormat")}
        </Label>
        <Select value={oddsFormat} onValueChange={onOddsFormatChange}>
          <SelectTrigger className="w-32 h-8 text-sm bg-card border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="decimal">{t("settings.decimal")}</SelectItem>
            <SelectItem value="american">{t("settings.american")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Label className="text-sm text-muted-foreground">
          {t("settings.bothCanLose")}
        </Label>
        <Switch
          checked={bothLosePossible}
          onCheckedChange={onBothLosePossibleChange}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-xs">{t("tooltip.bothCanLose")}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
