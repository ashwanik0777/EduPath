import { OverviewInsights } from "../types";

type ProgressTrackerTabProps = {
  panelClass: string;
  overviewInsights: OverviewInsights;
};

export function ProgressTrackerTab({ panelClass, overviewInsights }: ProgressTrackerTabProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className={`${panelClass} p-5`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Weekly Session Trend</h3>
        <div className="space-y-2">
          {overviewInsights.weekBuckets.map((bucket, index) => (
            <div key={`${bucket.label}-${index}`}>
              <div className="flex items-center justify-between text-xs text-slate-600 mb-1"><span>Week {index + 1} ({bucket.label})</span><span>{bucket.count}</span></div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${Math.max(6, Math.min(100, bucket.count * 12))}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${panelClass} p-5`}>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Progress KPIs</h3>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-center justify-between"><span>Total Sessions</span><span className="font-semibold">{overviewInsights.totalSessions}</span></div>
          <div className="flex items-center justify-between"><span>Completion Rate</span><span className="font-semibold">{overviewInsights.completionRate}%</span></div>
          <div className="flex items-center justify-between"><span>Average Duration</span><span className="font-semibold">{overviewInsights.avgDuration} min</span></div>
          <div className="flex items-center justify-between"><span>Cancelled / No-show</span><span className="font-semibold">{overviewInsights.cancelledOrNoShowCount}</span></div>
        </div>
      </div>
    </div>
  );
}
