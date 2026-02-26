type WebsitePage = {
  id: string;
  name: string;
  route: string;
  status: "published" | "draft";
  records: number;
};

type WebsiteStatisticsTabProps = {
  focusedWebsitePages: WebsitePage[];
  websiteSettings: { maintenanceMode: boolean };
  overview: { counters: { users: number } } | null;
  analytics: {
    psychometric: { totalResults: number };
    counseling: { upcomingSessions: number };
  } | null;
};

export function WebsiteStatisticsTab({ focusedWebsitePages, websiteSettings, overview, analytics }: WebsiteStatisticsTabProps) {
  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Focused Website Pages</p>
          <p className="text-2xl font-bold mt-1 text-slate-900">{focusedWebsitePages.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Published Pages</p>
          <p className="text-2xl font-bold mt-1 text-emerald-700">
            {focusedWebsitePages.filter((page) => page.status === "published").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Total Website Records</p>
          <p className="text-2xl font-bold mt-1 text-indigo-700">
            {focusedWebsitePages.reduce((sum, page) => sum + (page.records || 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Maintenance Mode</p>
          <p className={`text-2xl font-bold mt-1 ${websiteSettings.maintenanceMode ? "text-rose-600" : "text-emerald-600"}`}>
            {websiteSettings.maintenanceMode ? "On" : "Off"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Users</p>
          <p className="text-3xl font-bold text-slate-900">{overview?.counters.users ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Assessments Submitted</p>
          <p className="text-3xl font-bold text-slate-900">{analytics?.psychometric.totalResults ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Upcoming Counseling Sessions</p>
          <p className="text-3xl font-bold text-slate-900">{analytics?.counseling.upcomingSessions ?? 0}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold text-slate-900 mb-3">Website Page Statistics</h4>
        <div className="space-y-2">
          {focusedWebsitePages.map((page) => (
            <div key={page.id} className="rounded-lg border border-slate-200 p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div>
                <p className="font-medium text-slate-900">{page.name}</p>
                <p className="text-xs text-slate-500">Route: {page.route}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-600">Records: <span className="font-semibold text-slate-900">{page.records}</span></span>
                <span className={page.status === "published" ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                  {page.status === "published" ? "Published" : "Draft"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
