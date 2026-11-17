// ========== APPLIANCE CONTEXT ==========
"use client";
import { createContext, useContext, useState } from "react";
import { initialAppliances } from "@/data/appliances";

const ApplianceContext = createContext();

export function ApplianceProvider({ children }) {
  const [appliances, setAppliances] = useState(initialAppliances);
  const [rate, setRate] = useState(8); // rupees per unit

  const addAppliance = (appliance) =>
    setAppliances((prev) => [...prev, { ...appliance, id: Date.now() }]);

  const removeAppliance = (id) =>
    setAppliances((prev) => prev.filter((a) => a.id !== id));

  // ===== CALCULATIONS =====
  const monthlyUnits = (a) =>
  (a.watts * a.hours * (a.quantity || 1) * 30) / 1000;
  const totalUnits = appliances.reduce((sum, a) => sum + monthlyUnits(a), 0);
  const totalCost = totalUnits * rate;
  const topConsumer = appliances.length
    ? appliances.reduce((max, a) => (monthlyUnits(a) > monthlyUnits(max) ? a : max))
    : null;

  return (
    <ApplianceContext.Provider
      value={{
        appliances,
        rate,
        setRate,
        addAppliance,
        removeAppliance,
        monthlyUnits,
        totalUnits,
        totalCost,
        topConsumer,
      }}
    >
      {children}
    </ApplianceContext.Provider>
  );
}

export function useAppliances() {
  return useContext(ApplianceContext);
}