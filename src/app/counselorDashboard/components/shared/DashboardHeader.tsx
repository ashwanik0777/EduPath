import { ShieldCheck, RefreshCw } from "lucide-react";

type DashboardHeaderProps = {
  title: string;
  subtitle: string;
  refreshing: boolean;
  secondaryButtonClass: string;
  onRefresh: () => void;
};

export function DashboardHeader({ title, subtitle, refreshing, secondaryButtonClass, onRefresh }: DashboardHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-5 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white flex items-center justify-center shadow-md">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          <p className="text-slate-600">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline-flex text-xs px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
          Counselor-only access
        </span>
        <button onClick={onRefresh} className={secondaryButtonClass}>
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
    </div>
  );
}
