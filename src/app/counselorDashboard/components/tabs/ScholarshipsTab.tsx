import { CounselorResourcesResponse } from "../types";

type ScholarshipsTabProps = {
  panelClass: string;
  resources: CounselorResourcesResponse["data"] | null;
};

export function ScholarshipsTab({ panelClass, resources }: ScholarshipsTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <h3 className="font-semibold text-slate-900 mb-3">Scholarships</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {(resources?.scholarships || []).map((scholarship) => (
          <div key={scholarship._id} className="border border-slate-200 rounded-lg p-3">
            <p className="font-medium text-slate-900">{String(scholarship.name || "Scholarship")}</p>
            <p className="text-xs text-slate-500">{String(scholarship.provider || "-")} • {String(scholarship.amount || "-")}</p>
            <p className="text-xs text-slate-600 mt-1">Deadline: {String(scholarship.deadline || "-")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
