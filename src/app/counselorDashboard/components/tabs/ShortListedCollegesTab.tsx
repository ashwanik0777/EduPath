import { RecommendationItem } from "../types";

type ShortListedCollegesTabProps = {
  panelClass: string;
  shortListedRecommendations: RecommendationItem[];
};

export function ShortListedCollegesTab({ panelClass, shortListedRecommendations }: ShortListedCollegesTabProps) {
  return (
    <div className={`${panelClass} p-5`}>
      <h3 className="font-semibold text-slate-900 mb-3">Shortlist Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {shortListedRecommendations.map((college) => (
          <div key={college.id} className="border border-slate-200 rounded-lg p-3">
            <p className="font-medium text-slate-900">{college.name}</p>
            <p className="text-xs text-slate-500">{college.location}</p>
            <div className="mt-2 flex items-center justify-between text-xs"><span className="capitalize text-slate-600">{college.type}</span><span className="font-semibold text-indigo-700">Match {college.score}%</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
