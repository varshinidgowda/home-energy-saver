
"use client";

import { useAppliances } from "@/context/ApplianceContext";

export default function SavingTips() {
  const { appliances } = useAppliances();

  const getTips = (name) => {
    const appliance = name.toLowerCase();

    if (appliance.includes("fan")) {
      return [
        "Switch off the fan when leaving the room.",
        "Clean fan blades regularly.",
        "Use natural ventilation when possible.",
      ];
    }

    if (appliance.includes("ac") || appliance.includes("air conditioner")) {
      return [
        "Set AC temperature around 24–26°C.",
        "Clean AC filters regularly.",
        "Keep doors and windows closed while using AC.",
      ];
    }

    if (appliance.includes("bulb") || appliance.includes("light")) {
      return [
        "Use LED bulbs.",
        "Switch off unused lights.",
        "Use natural daylight.",
      ];
    }

    if (appliance.includes("refrigerator") || appliance.includes("fridge")) {
      return [
        "Avoid opening the fridge frequently.",
        "Allow hot food to cool before storing.",
        "Check the door seal regularly.",
      ];
    }

    if (appliance.includes("geyser")) {
      return [
        "Switch off the geyser after use.",
        "Avoid unnecessary heating.",
        "Use a suitable temperature setting.",
      ];
    }

    if (appliance.includes("television") || appliance.includes("tv")) {
      return [
        "Switch off the TV when not in use.",
        "Avoid standby mode.",
        "Use power-saving settings.",
      ];
    }

    return [
      "Switch off the appliance when not in use.",
      "Avoid unnecessary usage.",
      "Choose energy-efficient settings when available.",
    ];
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Energy Saving Tips
      </h1>

      <p className="mb-6 text-gray-500">
        Tips based on your added appliances.
      </p>

      {appliances.length === 0 ? (
        <p className="text-gray-500">
          Add appliances to see saving tips.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {appliances.map((appliance) => (
            <div
              key={appliance.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <h2 className="mb-3 text-xl font-semibold">
                ⚡ {appliance.name}
              </h2>

              <p className="mb-3 text-sm text-gray-500">
                {appliance.watts} W · {appliance.hours} hrs/day
              </p>

              <ul className="space-y-2">
                {getTips(appliance.name).map((tip, index) => (
                  <li key={index} className="text-gray-600">
                    ✓ {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
