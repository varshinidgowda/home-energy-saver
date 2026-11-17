export default function Input({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  required = true,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}