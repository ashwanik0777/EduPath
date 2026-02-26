import { CheckCircle2 } from "lucide-react";

type Assessment = {
  _id: string;
  title: string;
  type: string;
  duration: number;
  totalQuestions: number;
  isActive: boolean;
  attempts: number;
};

type PsychometricTabProps = {
  analytics: {
    psychometric: {
      totalAssessments: number;
      activeAssessments: number;
      totalResults: number;
      averageScore: number;
    };
  } | null;
  assessments: Assessment[];
  askConfirmation: (config: {
    title: string;
    description: string;
    confirmLabel: string;
    confirmVariant?: "default" | "destructive";
    action: () => Promise<void>;
  }) => void;
  updateAssessmentStatus: (assessmentId: string, isActive: boolean) => Promise<void>;
};

export function PsychometricTab({ analytics, assessments, askConfirmation, updateAssessmentStatus }: PsychometricTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total Assessments</p><p className="text-2xl font-bold">{analytics?.psychometric.totalAssessments ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Active Assessments</p><p className="text-2xl font-bold">{analytics?.psychometric.activeAssessments ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Result Entries</p><p className="text-2xl font-bold">{analytics?.psychometric.totalResults ?? 0}</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Average Score</p><p className="text-2xl font-bold">{Math.round(analytics?.psychometric.averageScore ?? 0)}%</p></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5 overflow-auto">
        <h4 className="font-semibold text-slate-900 mb-3">Assessment Controls</h4>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b border-slate-200 text-slate-500">
              <th className="p-2">Title</th>
              <th className="p-2">Type</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Questions</th>
              <th className="p-2">Attempts</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map((assessment) => (
              <tr key={assessment._id} className="border-b border-slate-100">
                <td className="p-2 font-medium text-slate-800">{assessment.title}</td>
                <td className="p-2 text-slate-600 capitalize">{assessment.type}</td>
                <td className="p-2 text-slate-600">{assessment.duration} min</td>
                <td className="p-2 text-slate-600">{assessment.totalQuestions}</td>
                <td className="p-2 text-slate-600">{assessment.attempts}</td>
                <td className="p-2">
                  <button
                    onClick={() =>
                      askConfirmation({
                        title: `${assessment.isActive ? "Disable" : "Enable"} Assessment`,
                        description: `This will mark "${assessment.title}" as ${assessment.isActive ? "inactive" : "active"}.`,
                        confirmLabel: assessment.isActive ? "Disable" : "Enable",
                        confirmVariant: assessment.isActive ? "destructive" : "default",
                        action: async () => updateAssessmentStatus(assessment._id, !assessment.isActive),
                      })
                    }
                    className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs ${assessment.isActive ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"}`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {assessment.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
