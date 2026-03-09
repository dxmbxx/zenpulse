import React, { createContext, useContext, useMemo, useState } from 'react';

type Plan = 'monthly' | 'yearly';

type AppContextType = {
  isSubscribed: boolean;
  selectedPlan: Plan;
  setSelectedPlan: (plan: Plan) => void;
  buyPremium: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>('yearly');

  const value = useMemo(
    () => ({
      isSubscribed,
      selectedPlan,
      setSelectedPlan,
      buyPremium: () => setIsSubscribed(true),
    }),
    [isSubscribed, selectedPlan]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppState must be used inside AppProvider');
  }
  return ctx;
}