import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb } from "lucide-react";
import {
  type BetData,
  type CalculatorMode,
} from "@/hooks/use-hedge-calculator";
import { type OddsFormat } from "@/hooks/use-odds-converter";
import { useI18n } from "@/hooks/use-i18n";

interface BetTabsProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
  bet2: BetData;
  onBet2Change: (bet: BetData) => void;
  hedgeOdds: string;
  hedgeLabel: string;
  onHedgeOddsChange: (value: string) => void;
  onHedgeLabelChange: (value: string) => void;
  oddsFormat: OddsFormat;
}

export const BetTabs = ({
  mode,
  onModeChange,
  bet2,
  onBet2Change,
  hedgeOdds,
  hedgeLabel,
  onHedgeOddsChange,
  onHedgeLabelChange,
  oddsFormat,
}: BetTabsProps) => {
  const { t } = useI18n();
  const oddsPlaceholder = oddsFormat === "decimal" ? "2.85" : "+185";
  const oddsExample = oddsFormat === "decimal" ? "(2.85)" : "(+185)";

  return (
    <div className="bg-slate-50 dark:bg-slate-700 rounded-xl shadow-sm border border-slate-200 dark:border-slate-600 p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400 rounded-full shadow-sm"></div>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          {t("bet.secondBet")}
        </h3>
      </div>

      <Tabs
        value={mode}
        onValueChange={(value) => onModeChange(value as CalculatorMode)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">{t("tabs.manualEntry")}</TabsTrigger>
          <TabsTrigger value="optimizer">
            {t("tabs.hedgeOptimizer")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {t("bet.label")}
              </Label>
              <Input
                placeholder={t("bet.teamB")}
                value={bet2.label}
                onChange={(e) =>
                  onBet2Change({ ...bet2, label: e.target.value })
                }
                className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("bet.odds")} {oddsExample}
                </Label>
                <Input
                  placeholder={oddsPlaceholder}
                  value={bet2.odds}
                  onChange={(e) =>
                    onBet2Change({ ...bet2, odds: e.target.value })
                  }
                  className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {t("bet.stake")}
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.69"
                  value={bet2.stake}
                  onChange={(e) =>
                    onBet2Change({ ...bet2, stake: e.target.value })
                  }
                  className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="optimizer">
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {t("bet.label")}
              </Label>
              <Input
                placeholder={t("bet.teamB")}
                value={hedgeLabel}
                onChange={(e) => onHedgeLabelChange(e.target.value)}
                className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {t("tabs.availableOdds")} {oddsExample}
              </Label>
              <Input
                placeholder={oddsPlaceholder}
                value={hedgeOdds}
                onChange={(e) => onHedgeOddsChange(e.target.value)}
                className="mt-1 bg-white dark:bg-slate-600 border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-400"
              />
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <Lightbulb className="h-4 w-4 inline mr-1" />
                {t("tabs.optimizerHint")}
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
