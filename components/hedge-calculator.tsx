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
    <div className="min-h-screen bg-background dot-pattern transition-colors duration-500">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-10 lg:px-16">
        {/* Header */}
        <Header onReset={reset} />

        {/* Main content */}
        <div className="mt-10 space-y-10">
          {/* Controls bar */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value as CalculatorMode)}
            >
              <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:inline-grid h-11 p-1 bg-secondary/60 backdrop-blur-sm">
                <TabsTrigger
                  value="manual"
                  className="text-sm font-medium px-8 data-[state=active]:shadow-md transition-all"
                >
                  {t("tabs.manualEntry")}
                </TabsTrigger>
                <TabsTrigger
                  value="optimizer"
                  className="text-sm font-medium px-8 data-[state=active]:shadow-md transition-all"
                >
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

          {/* Bet inputs */}
          <div className="grid gap-6 lg:grid-cols-2 stagger-children">
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

        {/* Footer accent line */}
        <div className="mt-16 mb-8 flex justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </div>
    </div>
  );
}
