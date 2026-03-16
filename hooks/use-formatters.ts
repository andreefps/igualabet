import { useCallback } from "react";

export const useFormatters = () => {
  const formatNumber = useCallback((amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }, []);

  const formatPercentage = useCallback((percentage: number): string => {
    return `${percentage >= 0 ? "+" : ""}${percentage.toFixed(2)}%`;
  }, []);

  return { formatCurrency: formatNumber, formatPercentage };
};
