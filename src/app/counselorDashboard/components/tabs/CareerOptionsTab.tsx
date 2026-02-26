import { CounselorResourcesResponse } from "../types";

type CareerOptionsTabProps = {
  panelClass: string;
  resources: CounselorResourcesResponse["data"] | null;
};

export function CareerOptionsTab({ panelClass, resources }: CareerOptionsTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <h3 className="font-semibold text-slate-900 mb-3">Career Options</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {(resources?.careers || []).map((career) => (
          <div key={career._id} className="border border-slate-200 rounded-lg p-3">
            <p className="font-medium text-slate-900">{String(career.title || "Career")}</p>
            <p className="text-xs text-slate-500">{String(career.stream || "-")} • {String(career.career_nature || "-")}</p>
            <p className="text-xs text-slate-600 mt-1">Salary: {String(career.salary_range || "-")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
