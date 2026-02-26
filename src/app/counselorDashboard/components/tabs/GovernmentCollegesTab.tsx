import { RefreshCw, Search } from "lucide-react";
import { CounselorResourcesResponse } from "../types";

type GovernmentCollegesTabProps = {
  panelClass: string;
  inputClass: string;
  primaryButtonClass: string;
  secondaryButtonClass: string;
  resources: CounselorResourcesResponse["data"] | null;
  resourceSearch: string;
  setResourceSearch: React.Dispatch<React.SetStateAction<string>>;
  loadResources: (query?: string) => Promise<void>;
};

export function GovernmentCollegesTab({
  panelClass,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  resources,
  resourceSearch,
  setResourceSearch,
  loadResources,
}: GovernmentCollegesTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <div className="flex items-center justify-between mb-3"><h3 className="font-semibold text-slate-900">Government Colleges</h3><button onClick={() => loadResources(resourceSearch)} className={secondaryButtonClass}><RefreshCw className="w-4 h-4"/>Reload</button></div>
      <div className="flex gap-2 mb-4"><input value={resourceSearch} onChange={(event) => setResourceSearch(event.target.value)} className={inputClass} placeholder="Search resources"/><button className={primaryButtonClass} onClick={() => loadResources(resourceSearch)}><Search className="w-4 h-4"/>Search</button></div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {(resources?.colleges || []).map((college) => (
          <div key={college._id} className="border border-slate-200 rounded-lg p-3">
            <p className="font-medium text-slate-900">{String(college.name || "College")}</p>
            <p className="text-xs text-slate-500 capitalize">{String(college.type || "-")} • {String((college as any)?.location?.city || "-")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
