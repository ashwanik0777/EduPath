import { CounselorResourcesResponse } from "../types";

type CompetitiveExamsTabProps = {
  panelClass: string;
  resources: CounselorResourcesResponse["data"] | null;
};

export function CompetitiveExamsTab({ panelClass, resources }: CompetitiveExamsTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <h3 className="font-semibold text-slate-900 mb-3">Competitive Exams</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {(resources?.exams || []).map((exam) => (
          <div key={exam._id} className="border border-slate-200 rounded-lg p-3">
            <p className="font-medium text-slate-900">{String(exam.name || "Exam")}</p>
            <p className="text-xs text-slate-500">{String(exam.type || "-")} • {String(exam.state || "-")}</p>
            <p className="text-xs text-slate-600 mt-1">Date: {String(exam.exam_date || "-")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
