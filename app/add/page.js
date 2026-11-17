"use client";

import { useState } from "react";
import { useAppliances } from "@/context/ApplianceContext";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function AddAppliance() {
  const { addAppliance } = useAppliances();

  const [formData, setFormData] = useState({
    name: "",
    watts: "",
    quantity: "1",
    hours: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const watts = Number(formData.watts);
    const quantity = Number(formData.quantity);
    const hours = Number(formData.hours);

    if (!formData.name.trim()) {
      setMessage("Please enter an appliance name.");
      return;
    }

    if (watts <= 0 || !Number.isFinite(watts)) {
      setMessage("Please enter valid power consumption.");
      return;
    }

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      setMessage("Quantity must be a positive whole number.");
      return;
    }

    if (
      !Number.isFinite(hours) ||
      hours <= 0 ||
      hours > 24
    ) {
      setMessage("Daily usage must be between 0 and 24 hours.");
      return;
    }

    addAppliance({
      name: formData.name.trim(),
      watts,
      quantity,
      hours,
    });

    setFormData({
      name: "",
      watts: "",
      quantity: "1",
      hours: "",
    });

    setMessage("Appliance added successfully!");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">
        Add Appliance
      </h1>

      <p className="mb-6 text-gray-500">
        Enter your appliance details to track its electricity usage.
      </p>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        <Input
          id="name"
          label="Appliance Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Ceiling Fan"
        />

        <Input
          id="watts"
          label="Power Consumption (Watts)"
          name="watts"
          type="number"
          value={formData.watts}
          onChange={handleChange}
          placeholder="e.g. 75"
          min="1"
          step="any"
        />

        <Input
          id="quantity"
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          step="1"
        />

        <Input
          id="hours"
          label="Daily Usage (Hours)"
          name="hours"
          type="number"
          value={formData.hours}
          onChange={handleChange}
          placeholder="e.g. 8"
          min="0.1"
          max="24"
          step="0.1"
        />

        {message && (
          <p
            role="status"
            className={`mb-4 text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <Button type="submit">
          Add Appliance
        </Button>
      </form>
    </div>
  );
}