// ========== STAT CARD ==========
export default function StatCard({ title, value, note }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 text-3xl font-bold text-green-600">{value}</p>
      {note && <p className="mt-1 text-sm text-gray-400">{note}</p>}
    </div>
  );
}