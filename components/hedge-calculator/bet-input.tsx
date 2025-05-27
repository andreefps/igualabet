import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type BetData } from "@/hooks/use-hedge-calculator";
import { type OddsFormat } from "@/hooks/use-odds-converter";
import { useI18n } from "@/hooks/use-i18n";

interface BetInputProps {
  bet: BetData;
  onBetChange: (bet: BetData) => void;
  title: string;
  colorClass: string;
  oddsFormat: OddsFormat;
  showStake?: boolean;
}

export const BetInput = ({
  bet,
  onBetChange,
  title,
  colorClass,
  oddsFormat,
  showStake = true,
}: BetInputProps) => {
  const { t } = useI18n();
  const oddsPlaceholder = oddsFormat === "decimal" ? "1.72" : "-110";
  const oddsExample = oddsFormat === "decimal" ? "(1.72)" : "(-110)";

  return (
    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 ${colorClass} rounded-full shadow-sm`}></div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h3>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {t("bet.label")}
          </Label>
          <Input
            placeholder={bet.label}
            value={bet.label}
            onChange={(e) => onBetChange({ ...bet, label: e.target.value })}
            className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
          />
        </div>
        <div
          className={`grid ${showStake ? "grid-cols-2" : "grid-cols-1"} gap-3`}
        >
          <div>
            <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {t("bet.odds")} {oddsExample}
            </Label>
            <Input
              placeholder={oddsPlaceholder}
              value={bet.odds}
              onChange={(e) => onBetChange({ ...bet, odds: e.target.value })}
              className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
            />
          </div>
          {showStake && (
            <div>
              <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {t("bet.stake")}
              </Label>
              <Input
                type="number"
                step="0.01"
                placeholder="100.00"
                value={bet.stake}
                onChange={(e) => onBetChange({ ...bet, stake: e.target.value })}
                className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
