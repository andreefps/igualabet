import { useCallback } from "react";

export const useFormatters = () => {
  const formatCurrency = useCallback((amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }, []);

  const formatPercentage = useCallback((percentage: number): string => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
  }, []);

  return { formatCurrency, formatPercentage };
};
