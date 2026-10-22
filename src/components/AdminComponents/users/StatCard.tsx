import type { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  iconClassName: string; // ej: "bg-indigo-50 text-indigo-600"
  label: string;
  value: number;
  hint: string;
}

export default function StatCard({ icon, iconClassName, label, value, hint }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}>{icon}</div>
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 font-serif text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{hint}</p>
    </div>
  );
}
