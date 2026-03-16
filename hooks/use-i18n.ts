"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";

export type Locale = "en" | "pt-br" | "es" | "fr";

const LOCALES: Locale[] = ["en", "pt-br", "es", "fr"];

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  "pt-br": "PT",
  es: "ES",
  fr: "FR",
};

interface Translations {
  [key: string]: Record<Locale, string>;
}

const translations: Translations = {
  // Header
  "header.appName": {
    en: "IgualaBet",
    "pt-br": "IgualaBet",
    es: "IgualaBet",
    fr: "IgualaBet",
  },
  "header.tagline": {
    en: "Smart hedge betting calculator",
    "pt-br": "Calculadora inteligente de apostas hedge",
    es: "Calculadora inteligente de apuestas hedge",
    fr: "Calculateur intelligent de paris de couverture",
  },

  // Settings
  "settings.oddsFormat": {
    en: "Odds Format",
    "pt-br": "Formato das Odds",
    es: "Formato de Cuotas",
    fr: "Format des Cotes",
  },
  "settings.bothCanLose": {
    en: "Both can lose",
    "pt-br": "Ambas podem perder",
    es: "Ambas pueden perder",
    fr: "Les deux peuvent perdre",
  },
  "settings.decimal": {
    en: "Decimal",
    "pt-br": "Decimal",
    es: "Decimal",
    fr: "Décimal",
  },
  "settings.american": {
    en: "American",
    "pt-br": "Americano",
    es: "Americano",
    fr: "Américain",
  },

  // Bet Input
  "bet.firstBet": {
    en: "First Bet",
    "pt-br": "Primeira Aposta",
    es: "Primera Apuesta",
    fr: "Premier Pari",
  },
  "bet.secondBet": {
    en: "Second Bet",
    "pt-br": "Segunda Aposta",
    es: "Segunda Apuesta",
    fr: "Deuxième Pari",
  },
  "bet.hedgeOdds": {
    en: "Hedge Odds",
    "pt-br": "Odds do Hedge",
    es: "Cuotas del Hedge",
    fr: "Cotes de Couverture",
  },
  "bet.label": {
    en: "Label",
    "pt-br": "Nome",
    es: "Nombre",
    fr: "Nom",
  },
  "bet.odds": {
    en: "Odds",
    "pt-br": "Odds",
    es: "Cuotas",
    fr: "Cotes",
  },
  "bet.stake": {
    en: "Stake",
    "pt-br": "Valor",
    es: "Apuesta",
    fr: "Mise",
  },
  "bet.teamA": {
    en: "Team A",
    "pt-br": "Time A",
    es: "Equipo A",
    fr: "Équipe A",
  },
  "bet.teamB": {
    en: "Team B",
    "pt-br": "Time B",
    es: "Equipo B",
    fr: "Équipe B",
  },

  // Bet Tabs
  "tabs.manualEntry": {
    en: "Manual Entry",
    "pt-br": "Entrada Manual",
    es: "Entrada Manual",
    fr: "Saisie Manuelle",
  },
  "tabs.hedgeOptimizer": {
    en: "Hedge Optimizer",
    "pt-br": "Otimizador",
    es: "Optimizador",
    fr: "Optimiseur",
  },
  "tabs.availableOdds": {
    en: "Available Odds",
    "pt-br": "Odds Disponíveis",
    es: "Cuotas Disponibles",
    fr: "Cotes Disponibles",
  },
  "tabs.optimizerHint": {
    en: "We'll calculate the optimal stake for you",
    "pt-br": "Calcularemos o valor ideal para você",
    es: "Calcularemos la apuesta óptima para ti",
    fr: "Nous calculerons la mise optimale pour vous",
  },

  // Results
  "results.scenarios": {
    en: "Scenarios",
    "pt-br": "Cenários",
    es: "Escenarios",
    fr: "Scénarios",
  },
  "results.recommendations": {
    en: "Recommendations",
    "pt-br": "Recomendações",
    es: "Recomendaciones",
    fr: "Recommandations",
  },
  "results.return": {
    en: "Return",
    "pt-br": "Retorno",
    es: "Retorno",
    fr: "Retour",
  },
  "results.profit": {
    en: "Profit",
    "pt-br": "Lucro",
    es: "Ganancia",
    fr: "Profit",
  },
  "results.bothLose": {
    en: "Both Lose",
    "pt-br": "Ambas Perdem",
    es: "Ambas Pierden",
    fr: "Les Deux Perdent",
  },
  "results.wins": {
    en: "wins",
    "pt-br": "vence",
    es: "gana",
    fr: "gagne",
  },
  "results.recommendedStake": {
    en: "Recommended Stake",
    "pt-br": "Valor Recomendado",
    es: "Apuesta Recomendada",
    fr: "Mise Recommandée",
  },
  "results.totalStake": {
    en: "Total Invested",
    "pt-br": "Total Investido",
    es: "Total Invertido",
    fr: "Total Investi",
  },
  "results.bestOutcome": {
    en: "Best Outcome",
    "pt-br": "Melhor Resultado",
    es: "Mejor Resultado",
    fr: "Meilleur Résultat",
  },
  "results.recommended": {
    en: "Recommended",
    "pt-br": "Recomendado",
    es: "Recomendado",
    fr: "Recommandé",
  },

  // Strategies
  "strategy.guaranteedProfit": {
    en: "Guaranteed Profit",
    "pt-br": "Lucro Garantido",
    es: "Ganancia Garantizada",
    fr: "Profit Garanti",
  },
  "strategy.guaranteedProfitDesc": {
    en: "Lock in profit regardless of outcome",
    "pt-br": "Garanta lucro independente do resultado",
    es: "Asegura ganancias sin importar el resultado",
    fr: "Verrouillez le profit quel que soit le résultat",
  },
  "strategy.breakEven": {
    en: "Break Even",
    "pt-br": "Empate",
    es: "Punto de Equilibrio",
    fr: "Seuil de Rentabilité",
  },
  "strategy.breakEvenDesc": {
    en: "Break even if hedge wins, profit if original wins",
    "pt-br": "Empate se hedge vencer, lucro se aposta original vencer",
    es: "Empate si el hedge gana, ganancia si la apuesta original gana",
    fr: "Équilibre si la couverture gagne, profit si le pari original gagne",
  },
  "strategy.minimizeLoss": {
    en: "Minimize Loss",
    "pt-br": "Minimizar Perda",
    es: "Minimizar Pérdida",
    fr: "Minimiser la Perte",
  },
  "strategy.minimizeLossDesc": {
    en: "Balance losses to minimize worst-case scenario",
    "pt-br": "Balance perdas para minimizar o pior cenário",
    es: "Equilibra pérdidas para minimizar el peor escenario",
    fr: "Équilibrez les pertes pour minimiser le pire scénario",
  },

  // Warning
  "warning.bothLoseTitle": {
    en: "Both Lose Enabled",
    "pt-br": "Ambas Perdem Habilitado",
    es: "Ambas Pierden Habilitado",
    fr: "Les Deux Perdent Activé",
  },
  "warning.bothLoseDesc": {
    en: "Verify this scenario is possible for your specific bets.",
    "pt-br":
      "Verifique se este cenário é possível para suas apostas específicas.",
    es: "Verifica si este escenario es posible para tus apuestas específicas.",
    fr: "Vérifiez si ce scénario est possible pour vos paris spécifiques.",
  },

  // Theme
  "theme.toggle": {
    en: "Toggle theme",
    "pt-br": "Alternar tema",
    es: "Cambiar tema",
    fr: "Changer le thème",
  },

  // Language
  "language.toggle": {
    en: "Change language",
    "pt-br": "Mudar idioma",
    es: "Cambiar idioma",
    fr: "Changer la langue",
  },

  // Actions
  "actions.reset": {
    en: "Reset",
    "pt-br": "Limpar",
    es: "Reiniciar",
    fr: "Réinitialiser",
  },
  "actions.copy": {
    en: "Copy",
    "pt-br": "Copiar",
    es: "Copiar",
    fr: "Copier",
  },
  "actions.copied": {
    en: "Copied!",
    "pt-br": "Copiado!",
    es: "¡Copiado!",
    fr: "Copié !",
  },

  // Tooltips
  "tooltip.oddsDecimal": {
    en: "Decimal odds represent the total payout per unit staked (e.g. 2.50 means 2.50x return)",
    "pt-br":
      "Odds decimais representam o pagamento total por unidade apostada (ex: 2.50 significa 2.50x de retorno)",
    es: "Las cuotas decimales representan el pago total por unidad apostada (ej: 2.50 significa 2.50x de retorno)",
    fr: "Les cotes décimales représentent le paiement total par unité misée (ex : 2.50 signifie 2.50x de retour)",
  },
  "tooltip.oddsAmerican": {
    en: "American odds: positive (+150) shows profit on 100 bet, negative (-110) shows how much to bet to win 100",
    "pt-br":
      "Odds americanas: positivas (+150) mostram lucro em aposta de 100, negativas (-110) mostram quanto apostar para ganhar 100",
    es: "Cuotas americanas: positivas (+150) muestran ganancia en apuesta de 100, negativas (-110) muestran cuánto apostar para ganar 100",
    fr: "Cotes américaines : positives (+150) montrent le profit sur un pari de 100, négatives (-110) montrent combien miser pour gagner 100",
  },
  "tooltip.stake": {
    en: "How much money you're betting on this outcome",
    "pt-br": "Quanto dinheiro você está apostando neste resultado",
    es: "Cuánto dinero estás apostando en este resultado",
    fr: "Combien d'argent vous pariez sur ce résultat",
  },
  "tooltip.bothCanLose": {
    en: "Enable if both bets can lose simultaneously (e.g. different events or draw possible)",
    "pt-br":
      "Ative se ambas apostas podem perder simultaneamente (ex: eventos diferentes ou empate possível)",
    es: "Activa si ambas apuestas pueden perder simultáneamente (ej: eventos diferentes o empate posible)",
    fr: "Activez si les deux paris peuvent perdre simultanément (ex : événements différents ou match nul possible)",
  },
};

function isValidLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem("hedge-calc-locale");
  if (saved && isValidLocale(saved)) return saved;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("pt")) return "pt-br";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("fr")) return "fr";
  return "en";
}

interface I18nContextValue {
  locale: Locale;
  locales: Locale[];
  localeLabels: Record<Locale, string>;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export { I18nContext, LOCALES, LOCALE_LABELS, detectLocale, translations };
export type { I18nContextValue };

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
};
