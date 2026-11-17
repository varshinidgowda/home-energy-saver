
"use client";

import StatCard from "@/components/StatCard";
import { useAppliances } from "@/context/ApplianceContext";

export default function Dashboard() {
  const {
    appliances,
    totalUnits,
    totalCost,
    topConsumer,
    monthlyUnits,
    removeAppliance,
  } = useAppliances();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-6 sm:py-8">

      {/* DASHBOARD HEADING */}
      <h1 className="mb-5 sm:mb-6 text-2xl sm:text-3xl font-bold">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          title="Monthly Units"
          value={`${totalUnits.toFixed(1)} kWh`}
        />

        <StatCard
          title="Estimated Cost"
          value={`₹${totalCost.toFixed(0)}`}
        />

        <StatCard
          title="Top Consumer"
          value={topConsumer ? topConsumer.name : "None"}
          note={
            topConsumer
              ? `${monthlyUnits(topConsumer).toFixed(1)} kWh / month`
              : ""
          }
        />
      </div>

      {/* APPLIANCE LIST */}
      <h2 className="mb-3 mt-7 sm:mt-8 text-xl sm:text-2xl font-semibold">
        Your Appliances
      </h2>

      {appliances.length === 0 ? (
        <p className="text-gray-500 text-sm sm:text-base">
          No appliances yet. Add one to start.
        </p>
      ) : (
        <ul className="space-y-3">
          {appliances.map((a) => (
            <li
              key={a.id}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-white p-3 sm:p-4"
            >
              <div className="min-w-0">
                <p className="font-medium break-words">
                  {a.name}
                </p>

                <p className="text-sm text-gray-500">
                  {a.watts} W · {a.hours} hrs/day
                </p>
              </div>

              <button
                onClick={() => removeAppliance(a.id)}
                className="self-start sm:self-center rounded-md px-3 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
