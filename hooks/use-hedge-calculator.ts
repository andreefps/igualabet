import { useState, useEffect, useCallback } from "react";
import { useOddsConverter, type OddsFormat } from "./use-odds-converter";
import { useI18n } from "./use-i18n";

export interface BetData {
  odds: string;
  stake: string;
  label: string;
}

export interface CalculationResult {
  scenario: string;
  totalReturn: number;
  netProfit: number;
  profitPercentage: number;
}

export interface HedgeRecommendation {
  strategy: string;
  description: string;
  recommendedStake: number;
  profit1: number;
  profit2: number;
  icon: string;
}

export type CalculatorMode = "manual" | "optimizer";

export const useHedgeCalculator = () => {
  const { toDecimalOdds } = useOddsConverter();
  const { t } = useI18n();

  const [mode, setMode] = useState<CalculatorMode>("manual");
  const [bet1, setBet1] = useState<BetData>({
    odds: "1.72",
    stake: "100",
    label: t("bet.teamA"),
  });
  const [bet2, setBet2] = useState<BetData>({
    odds: "2.85",
    stake: "0.69",
    label: t("bet.teamB"),
  });
  const [hedgeOdds, setHedgeOdds] = useState("2.85");
  const [hedgeLabel, setHedgeLabel] = useState(t("bet.teamB"));
  const [bothLosePossible, setBothLosePossible] = useState(false);
  const [oddsFormat, setOddsFormat] = useState<OddsFormat>("decimal");
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [recommendations, setRecommendations] = useState<HedgeRecommendation[]>(
    []
  );
  const [totalStake, setTotalStake] = useState(0);

  const calculateRecommendations = useCallback(() => {
    const stake1 = Number.parseFloat(bet1.stake) || 0;
    const decimal1 = toDecimalOdds(bet1.odds, oddsFormat);
    const decimal2 = toDecimalOdds(hedgeOdds, oddsFormat);

    if (stake1 <= 0 || decimal1 <= 0 || decimal2 <= 0) {
      setRecommendations([]);
      return;
    }

    const newRecommendations: HedgeRecommendation[] = [];

    // Strategy 1: Guaranteed Profit (if possible)
    const profitStake = (stake1 * decimal1) / decimal2;
    const profit1WithProfit = stake1 * decimal1 - (stake1 + profitStake);
    const profit2WithProfit = profitStake * decimal2 - (stake1 + profitStake);

    if (profit1WithProfit > 0 && profit2WithProfit > 0) {
      newRecommendations.push({
        strategy: "Guaranteed Profit",
        description: "Lock in profit regardless of outcome",
        recommendedStake: profitStake,
        profit1: profit1WithProfit,
        profit2: profit2WithProfit,
        icon: "🎯",
      });
    }

    // Strategy 2: Break Even
    const breakEvenStake = stake1 / (decimal2 - 1);
    const profit1WithBreakEven = stake1 * decimal1 - (stake1 + breakEvenStake);
    const profit2WithBreakEven =
      breakEvenStake * decimal2 - (stake1 + breakEvenStake);

    newRecommendations.push({
      strategy: "Break Even",
      description: "Break even if hedge bet wins, profit if original bet wins",
      recommendedStake: breakEvenStake,
      profit1: profit1WithBreakEven,
      profit2: profit2WithBreakEven,
      icon: "⚖️",
    });

    // Strategy 3: Minimize Maximum Loss
    const minLossStake = (stake1 * (decimal1 - 1)) / (decimal2 + 1);
    const profit1WithMinLoss = stake1 * decimal1 - (stake1 + minLossStake);
    const profit2WithMinLoss =
      minLossStake * decimal2 - (stake1 + minLossStake);

    newRecommendations.push({
      strategy: "Minimize Loss",
      description: "Balance losses to minimize worst-case scenario",
      recommendedStake: minLossStake,
      profit1: profit1WithMinLoss,
      profit2: profit2WithMinLoss,
      icon: "🛡️",
    });

    setRecommendations(newRecommendations);
  }, [bet1.stake, bet1.odds, hedgeOdds, oddsFormat, toDecimalOdds]);

  const calculateResults = useCallback(() => {
    const stake1 = Number.parseFloat(bet1.stake) || 0;
    const stake2 = Number.parseFloat(bet2.stake) || 0;
    const decimal1 = toDecimalOdds(bet1.odds, oddsFormat);
    const decimal2 = toDecimalOdds(bet2.odds, oddsFormat);

    if (stake1 <= 0 || stake2 <= 0 || decimal1 <= 0 || decimal2 <= 0) {
      setResults([]);
      setTotalStake(0);
      return;
    }

    const total = stake1 + stake2;
    setTotalStake(total);

    const newResults: CalculationResult[] = [];

    // Scenario 1: Bet 1 wins, Bet 2 loses
    const return1 = stake1 * decimal1;
    const profit1 = return1 - total;
    newResults.push({
      scenario: bet1.label || "Bet 1 Wins",
      totalReturn: return1,
      netProfit: profit1,
      profitPercentage: (profit1 / total) * 100,
    });

    // Scenario 2: Bet 2 wins, Bet 1 loses
    const return2 = stake2 * decimal2;
    const profit2 = return2 - total;
    newResults.push({
      scenario: bet2.label || "Bet 2 Wins",
      totalReturn: return2,
      netProfit: profit2,
      profitPercentage: (profit2 / total) * 100,
    });

    // Scenario 3: Both lose (only if enabled)
    if (bothLosePossible) {
      newResults.push({
        scenario: "Both Lose",
        totalReturn: 0,
        netProfit: -total,
        profitPercentage: -100,
      });
    }

    setResults(newResults);
  }, [bet1, bet2, bothLosePossible, oddsFormat, toDecimalOdds]);

  const setHedgeBetValue = useCallback(
    (value: string) => {
      setHedgeOdds(value);
      setBet2({ ...bet2, odds: value });
    },
    [bet2]
  );

  useEffect(() => {
    if (mode === "manual") {
      calculateResults();
    } else {
      calculateRecommendations();
    }
  }, [mode, calculateResults, calculateRecommendations]);

  const isProfitableHedge =
    results.length >= 2 && results.slice(0, 2).every((r) => r.netProfit > 0);
  const hasValidInputs =
    mode === "manual" ? results.length > 0 : recommendations.length > 0;

  return {
    // State
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

    // Computed values
    isProfitableHedge,
    hasValidInputs,

    // Actions
    setMode,
    setBet1,
    setBet2,
    setHedgeOdds,
    setHedgeLabel,
    setBothLosePossible,
    setOddsFormat,
    setHedgeBetValue,
  };
};
