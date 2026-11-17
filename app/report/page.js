
"use client";

import { useAppliances } from "@/context/ApplianceContext";
import StatCard from "@/components/StatCard";

export default function UsageReport() {
  const {
    appliances,
    monthlyUnits,
    totalUnits,
    totalCost,
    rate,
  } = useAppliances();

  const sortedAppliances = [...appliances].sort(
    (a, b) => monthlyUnits(b) - monthlyUnits(a)
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Usage Report</h1>

      <p className="mb-6 text-gray-500">
        Track your monthly electricity consumption and estimated cost.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Monthly Consumption"
          value={`${totalUnits.toFixed(2)} kWh`}
          note="Estimated usage for 30 days"
        />

        <StatCard
          title="Estimated Monthly Cost"
          value={`₹${totalCost.toFixed(2)}`}
          note={`Based on ₹${rate} per unit`}
        />
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">
        Appliance-wise Breakdown
      </h2>

      {appliances.length === 0 ? (
        <p className="rounded-lg border bg-white p-5 text-gray-500">
          No appliance data available. Add appliances to view your report.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Appliance</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Power</th>
                <th className="p-4">Daily Usage</th>
                <th className="p-4">Monthly Units</th>
                <th className="p-4">Estimated Cost</th>
              </tr>
            </thead>

            <tbody>
              {sortedAppliances.map((appliance) => {
                const units = monthlyUnits(appliance);

                return (
                  <tr key={appliance.id} className="border-t">
                    <td className="p-4 font-medium">
                      {appliance.name}
                    </td>
                    <td className="p-4">
                      {appliance.quantity || 1}
                    </td>
                    <td className="p-4">{appliance.watts} W</td>
                    <td className="p-4">{appliance.hours} hrs</td>
                    <td className="p-4">{units.toFixed(2)} kWh</td>
                    <td className="p-4">
                      ₹{(units * rate).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {sortedAppliances.length > 0 && (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
          <h2 className="text-lg font-semibold text-green-800">
            Highest Energy Consumer
          </h2>

          <p className="mt-2 text-green-700">
            {sortedAppliances[0].name} uses{" "}
            {monthlyUnits(sortedAppliances[0]).toFixed(2)} kWh per month.
          </p>
        </div>
      )}
    </div>
  );
}
