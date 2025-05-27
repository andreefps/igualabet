import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600">
      <div className="flex items-center gap-3">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {t("settings.oddsFormat")}
        </Label>
        <Select value={oddsFormat} onValueChange={onOddsFormatChange}>
          <SelectTrigger className="w-40 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500">
            <SelectItem
              value="decimal"
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-500"
            >
              {t("settings.decimal")}
            </SelectItem>
            <SelectItem
              value="american"
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-500"
            >
              {t("settings.american")}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-3">
        <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {t("settings.bothCanLose")}
        </Label>
        <Switch
          checked={bothLosePossible}
          onCheckedChange={onBothLosePossibleChange}
        />
      </div>
    </div>
  );
};
