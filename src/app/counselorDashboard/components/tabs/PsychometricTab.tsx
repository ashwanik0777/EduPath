import { CounselorPsychometricResponse } from "../types";

type PsychometricTabProps = {
  panelClass: string;
  psychometric: CounselorPsychometricResponse["data"] | null;
};

export function PsychometricTab({ panelClass, psychometric }: PsychometricTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${panelClass} p-5`}><p className="text-sm text-slate-500">Total Attempts</p><p className="text-3xl font-bold text-slate-900">{psychometric?.totalAttempts ?? 0}</p></div>
        <div className={`${panelClass} p-5`}><p className="text-sm text-slate-500">Students Covered</p><p className="text-3xl font-bold text-slate-900">{psychometric?.studentsCovered ?? 0}</p></div>
        <div className={`${panelClass} p-5`}><p className="text-sm text-slate-500">Average Score</p><p className="text-3xl font-bold text-slate-900">{psychometric?.averageScore ?? 0}%</p></div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Top Categories</h3>
          {(psychometric?.topCategories || []).length === 0 ? <div className="text-sm text-slate-500">No psychometric category data yet.</div> : (
            <div className="space-y-2">
              {(psychometric?.topCategories || []).map((item) => (
                <div key={item.category} className="border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between"><p className="font-medium text-slate-900">{item.category}</p><p className="text-sm text-slate-700">{item.average}%</p></div>
                  <p className="text-xs text-slate-500 mt-1">Attempts: {item.attempts}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={`${panelClass} p-5`}>
          <h3 className="font-semibold text-slate-900 mb-3">Recent Results</h3>
          {(psychometric?.recentResults || []).length === 0 ? <div className="text-sm text-slate-500">No recent result entries found.</div> : (
            <div className="space-y-2">
              {(psychometric?.recentResults || []).map((row) => (
                <div key={row.id} className="border border-slate-200 rounded-lg p-3">
                  <p className="font-medium text-slate-900">{row.studentName}</p>
                  <p className="text-xs text-slate-500">{row.assessmentTitle}</p>
                  <p className="text-xs text-slate-600 mt-1">Score: {row.score}% • {new Date(row.completedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
