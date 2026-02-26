type ProgressTrackerTabProps = {
  analytics: {
    progress: {
      totalStudents: number;
      studentsWithAssessments: number;
      studentsWithSessions: number;
      averageAssessmentScore: number;
      completedSessions: number;
      scheduledSessions: number;
    };
  } | null;
};

export function ProgressTrackerTab({ analytics }: ProgressTrackerTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Students</p>
          <p className="text-3xl font-bold text-slate-900">{analytics?.progress.totalStudents ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">With Assessments</p>
          <p className="text-3xl font-bold text-slate-900">{analytics?.progress.studentsWithAssessments ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">With Sessions</p>
          <p className="text-3xl font-bold text-slate-900">{analytics?.progress.studentsWithSessions ?? 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-3">Assessment Performance</h4>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-blue-700">{Math.round(analytics?.progress.averageAssessmentScore ?? 0)}%</p>
            <p className="text-sm text-slate-500 pb-1">Average score across submitted assessments</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-3">Counseling Completion</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Completed</span>
                <span>{analytics?.progress.completedSessions ?? 0}</span>
              </div>
              <div className="h-2 bg-slate-100 rounded">
                <div
                  className="h-2 bg-emerald-500 rounded"
                  style={{
                    width: `${
                      ((analytics?.progress.completedSessions ?? 0) /
                        Math.max((analytics?.progress.completedSessions ?? 0) + (analytics?.progress.scheduledSessions ?? 0), 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>
            <div className="text-sm text-slate-500">Scheduled sessions: {analytics?.progress.scheduledSessions ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
