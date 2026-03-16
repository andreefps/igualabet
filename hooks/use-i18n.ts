import { useState, useEffect, useCallback } from "react";

export type Locale = "en" | "pt-br";

interface Translations {
  [key: string]: {
    en: string;
    "pt-br": string;
  };
}

const translations: Translations = {
  // Header
  "header.appName": {
    en: "IgualaBet",
    "pt-br": "IgualaBet",
  },
  "header.tagline": {
    en: "Smart hedge betting calculator",
    "pt-br": "Calculadora inteligente de apostas hedge",
  },

  // Settings
  "settings.oddsFormat": {
    en: "Odds Format",
    "pt-br": "Formato das Odds",
  },
  "settings.bothCanLose": {
    en: "Both can lose",
    "pt-br": "Ambas podem perder",
  },
  "settings.decimal": {
    en: "Decimal",
    "pt-br": "Decimal",
  },
  "settings.american": {
    en: "American",
    "pt-br": "Americano",
  },

  // Bet Input
  "bet.firstBet": {
    en: "First Bet",
    "pt-br": "Primeira Aposta",
  },
  "bet.secondBet": {
    en: "Second Bet",
    "pt-br": "Segunda Aposta",
  },
  "bet.hedgeOdds": {
    en: "Hedge Odds",
    "pt-br": "Odds do Hedge",
  },
  "bet.label": {
    en: "Label",
    "pt-br": "Nome",
  },
  "bet.odds": {
    en: "Odds",
    "pt-br": "Odds",
  },
  "bet.stake": {
    en: "Stake",
    "pt-br": "Valor",
  },
  "bet.teamA": {
    en: "Team A",
    "pt-br": "Time A",
  },
  "bet.teamB": {
    en: "Team B",
    "pt-br": "Time B",
  },

  // Bet Tabs
  "tabs.manualEntry": {
    en: "Manual Entry",
    "pt-br": "Entrada Manual",
  },
  "tabs.hedgeOptimizer": {
    en: "Hedge Optimizer",
    "pt-br": "Otimizador",
  },
  "tabs.availableOdds": {
    en: "Available Odds",
    "pt-br": "Odds Disponíveis",
  },
  "tabs.optimizerHint": {
    en: "We'll calculate the optimal stake for you",
    "pt-br": "Calcularemos o valor ideal para você",
  },

  // Results
  "results.scenarios": {
    en: "Scenarios",
    "pt-br": "Cenários",
  },
  "results.recommendations": {
    en: "Recommendations",
    "pt-br": "Recomendações",
  },
  "results.return": {
    en: "Return",
    "pt-br": "Retorno",
  },
  "results.profit": {
    en: "Profit",
    "pt-br": "Lucro",
  },
  "results.bothLose": {
    en: "Both Lose",
    "pt-br": "Ambas Perdem",
  },
  "results.wins": {
    en: "wins",
    "pt-br": "vence",
  },
  "results.recommendedStake": {
    en: "Recommended Stake",
    "pt-br": "Valor Recomendado",
  },
  "results.totalStake": {
    en: "Total Invested",
    "pt-br": "Total Investido",
  },
  "results.bestOutcome": {
    en: "Best Outcome",
    "pt-br": "Melhor Resultado",
  },
  "results.recommended": {
    en: "Recommended",
    "pt-br": "Recomendado",
  },

  // Strategies
  "strategy.guaranteedProfit": {
    en: "Guaranteed Profit",
    "pt-br": "Lucro Garantido",
  },
  "strategy.guaranteedProfitDesc": {
    en: "Lock in profit regardless of outcome",
    "pt-br": "Garanta lucro independente do resultado",
  },
  "strategy.breakEven": {
    en: "Break Even",
    "pt-br": "Empate",
  },
  "strategy.breakEvenDesc": {
    en: "Break even if hedge wins, profit if original wins",
    "pt-br": "Empate se hedge vencer, lucro se aposta original vencer",
  },
  "strategy.minimizeLoss": {
    en: "Minimize Loss",
    "pt-br": "Minimizar Perda",
  },
  "strategy.minimizeLossDesc": {
    en: "Balance losses to minimize worst-case scenario",
    "pt-br": "Balance perdas para minimizar o pior cenário",
  },

  // Warning
  "warning.bothLoseTitle": {
    en: "Both Lose Enabled",
    "pt-br": "Ambas Perdem Habilitado",
  },
  "warning.bothLoseDesc": {
    en: "Verify this scenario is possible for your specific bets.",
    "pt-br":
      "Verifique se este cenário é possível para suas apostas específicas.",
  },

  // Theme
  "theme.toggle": {
    en: "Toggle theme",
    "pt-br": "Alternar tema",
  },

  // Language
  "language.toggle": {
    en: "Toggle language",
    "pt-br": "Alternar idioma",
  },

  // Actions
  "actions.reset": {
    en: "Reset",
    "pt-br": "Limpar",
  },
  "actions.copy": {
    en: "Copy",
    "pt-br": "Copiar",
  },
  "actions.copied": {
    en: "Copied!",
    "pt-br": "Copiado!",
  },

  // Tooltips
  "tooltip.oddsDecimal": {
    en: "Decimal odds represent the total payout per unit staked (e.g. 2.50 means 2.50x return)",
    "pt-br":
      "Odds decimais representam o pagamento total por unidade apostada (ex: 2.50 significa 2.50x de retorno)",
  },
  "tooltip.oddsAmerican": {
    en: "American odds: positive (+150) shows profit on 100 bet, negative (-110) shows how much to bet to win 100",
    "pt-br":
      "Odds americanas: positivas (+150) mostram lucro em aposta de 100, negativas (-110) mostram quanto apostar para ganhar 100",
  },
  "tooltip.stake": {
    en: "How much money you're betting on this outcome",
    "pt-br": "Quanto dinheiro você está apostando neste resultado",
  },
  "tooltip.bothCanLose": {
    en: "Enable if both bets can lose simultaneously (e.g. different events or draw possible)",
    "pt-br":
      "Ative se ambas apostas podem perder simultaneamente (ex: eventos diferentes ou empate possível)",
  },
};

export const useI18n = () => {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const savedLocale = localStorage.getItem("hedge-calc-locale") as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "pt-br")) {
      setLocale(savedLocale);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("pt")) {
        setLocale("pt-br");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hedge-calc-locale", locale);
  }, [locale]);

  const t = useCallback(
    (key: string): string => {
      return translations[key]?.[locale] || key;
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === "en" ? "pt-br" : "en"));
  }, []);

  return { locale, t, toggleLocale };
};
