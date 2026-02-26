type ShortListedCollegesTabProps = {
  analytics: {
    shortlists: {
      totalShortlisted: number;
      appliedCount: number;
      uniqueCollegeCount: number;
      topColleges: { name: string; count: number; applied: number }[];
    };
  } | null;
};

export function ShortListedCollegesTab({ analytics }: ShortListedCollegesTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Shortlisted</p><p className="text-3xl font-bold">{analytics?.shortlists.totalShortlisted ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Applied Colleges</p><p className="text-3xl font-bold">{analytics?.shortlists.appliedCount ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Unique Colleges</p><p className="text-3xl font-bold">{analytics?.shortlists.uniqueCollegeCount ?? 0}</p></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold text-slate-900 mb-3">Top Shortlisted Colleges</h4>
        <div className="space-y-3">
          {(analytics?.shortlists.topColleges || []).map((college) => (
            <div key={college.name} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">{college.name}</p>
                <p className="text-xs text-slate-500">Applied by {college.applied} students</p>
              </div>
              <span className="rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs">{college.count} shortlists</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
