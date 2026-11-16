// ========== DASHBOARD PAGE ==========
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
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      {/* ===== STATS ===== */}
      <div className="grid gap-4 md:grid-cols-3">
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

      {/* ===== APPLIANCE LIST ===== */}
      <h2 className="mb-3 mt-8 text-2xl font-semibold">Your Appliances</h2>
      {appliances.length === 0 ? (
        <p className="text-gray-500">No appliances yet. Add one to start.</p>
      ) : (
        <ul className="space-y-2">
          {appliances.map((a) => (
            <li
              key={a.id}
              className="flex items-center justify-between rounded-lg border bg-white p-4"
            >
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-gray-500">
                  {a.watts} W · {a.hours} hrs/day
                </p>
              </div>
              <button
                onClick={() => removeAppliance(a.id)}
                className="text-sm text-red-500 hover:underline"
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