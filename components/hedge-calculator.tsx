"use client";

import { useHedgeCalculator } from "@/hooks/use-hedge-calculator";
import { useI18n } from "@/hooks/use-i18n";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Header,
  SettingsBar,
  BetInput,
  HedgeOddsInput,
  ScenarioResults,
  RecommendationResults,
  WarningCard,
} from "./hedge-calculator/index";
import type { CalculatorMode } from "@/hooks/use-hedge-calculator";

export default function HedgeCalculator() {
  const { t } = useI18n();
  const {
    mode,
    bet1,
    bet2,
    hedgeOdds,
    hedgeLabel,
    bothLosePossible,
    oddsFormat,
    results,
    recommendations,
    totalStake,
    setMode,
    setBet1,
    setBet2,
    setHedgeOdds,
    setHedgeLabel,
    setBothLosePossible,
    setOddsFormat,
    setHedgeBetValue,
    reset,
  } = useHedgeCalculator();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-6 py-10 sm:px-8 lg:px-12">
        <Header onReset={reset} />

        <div className="mt-8 space-y-8">
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value as CalculatorMode)}
            >
              <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-grid">
                <TabsTrigger value="manual" className="text-sm px-6">
                  {t("tabs.manualEntry")}
                </TabsTrigger>
                <TabsTrigger value="optimizer" className="text-sm px-6">
                  {t("tabs.hedgeOptimizer")}
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <SettingsBar
              oddsFormat={oddsFormat}
              onOddsFormatChange={setOddsFormat}
              bothLosePossible={bothLosePossible}
              onBothLosePossibleChange={setBothLosePossible}
            />
          </div>

          {/* Bet Inputs */}
          <div className="grid md:grid-cols-2 gap-6">
            <BetInput
              bet={bet1}
              onBetChange={setBet1}
              title={t("bet.firstBet")}
              accent="primary"
              oddsFormat={oddsFormat}
              showStake
            />

            {mode === "manual" ? (
              <BetInput
                bet={bet2}
                onBetChange={setBet2}
                title={t("bet.secondBet")}
                accent="secondary"
                oddsFormat={oddsFormat}
              />
            ) : (
              <HedgeOddsInput
                hedgeOdds={hedgeOdds}
                hedgeLabel={hedgeLabel}
                onHedgeOddsChange={setHedgeBetValue}
                onHedgeLabelChange={setHedgeLabel}
                oddsFormat={oddsFormat}
              />
            )}
          </div>

          {/* Results */}
          {mode === "manual" && (
            <ScenarioResults results={results} totalStake={totalStake} />
          )}

          {mode === "optimizer" && (
            <RecommendationResults
              recommendations={recommendations}
              bet1Label={bet1.label}
              hedgeLabel={hedgeLabel}
            />
          )}

          <WarningCard
            bothLosePossible={bothLosePossible}
            mode={mode}
            results={results}
          />
        </div>
      </div>
    </div>
  );
}
