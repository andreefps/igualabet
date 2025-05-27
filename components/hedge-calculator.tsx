"use client";

import { useHedgeCalculator } from "@/hooks/use-hedge-calculator";
import {
  Header,
  BetInput,
  BetTabs,
  ScenarioResults,
  RecommendationResults,
  WarningCard,
} from "./hedge-calculator/index";

export default function HedgeCalculator() {
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
    isProfitableHedge,
    hasValidInputs,
    setMode,
    setBet1,
    setBet2,
    setHedgeOdds,
    setHedgeLabel,
    setBothLosePossible,
    setOddsFormat,
    setHedgeBetValue,
  } = useHedgeCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <BetInput
              bet={bet1}
              onBetChange={setBet1}
              title="First Bet"
              colorClass="bg-gradient-to-r from-emerald-500 to-blue-500"
              oddsFormat={oddsFormat}
            />

            <BetTabs
              mode={mode}
              onModeChange={setMode}
              bet2={bet2}
              onBet2Change={setBet2}
              hedgeOdds={hedgeOdds}
              hedgeLabel={hedgeLabel}
              onHedgeOddsChange={setHedgeBetValue}
              onHedgeLabelChange={setHedgeLabel}
              oddsFormat={oddsFormat}
            />
          </div>

          {mode === "manual" && <ScenarioResults results={results} />}

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
