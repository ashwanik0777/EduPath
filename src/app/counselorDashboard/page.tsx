"use client";

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  RefreshCw,
  Video,
  Phone,
  MapPin,
  CheckCircle2,
  UserCircle2,
  Star,
  GraduationCap,
  Award,
  Target,
  Briefcase,
  Wrench,
  Activity,
  BarChart3,
  Timer,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import { Sidebar, MenuItem } from "@/app/components/Sidebar";

type CoreCounselorTab = "overview" | "sessions" | "students" | "messages";
type PlaceholderCounselorTab =
  | "profile"
  | "progressTracker"
  | "psychometricTest"
  | "govCollege"
  | "shortListedColleges"
  | "carrerOption"
  | "counselingBooking"
  | "competitiveExams"
  | "scholarships"
  | "feedback&Suggestions";
type CounselorTab = CoreCounselorTab | PlaceholderCounselorTab;

const placeholderTabs: Record<PlaceholderCounselorTab, { title: string; description: string }> = {
  profile: {
    title: "Profile",
    description: "Counselor profile management module is under development.",
  },
  progressTracker: {
    title: "Progress Tracker",
    description: "Counselor progress insights are under development.",
  },
  psychometricTest: {
    title: "Psychometric Test",
    description: "Psychometric test review panel is under development.",
  },
  govCollege: {
    title: "Government College",
    description: "Government college reference section is under development.",
  },
  shortListedColleges: {
    title: "Short Listed College",
    description: "Short listed college advisory module is under development.",
  },
  carrerOption: {
    title: "Career Option",
    description: "Career option recommendation workspace is under development.",
  },
  counselingBooking: {
    title: "Counseling Booking",
    description: "Detailed counseling booking workflow is under development.",
  },
  competitiveExams: {
    title: "Competitive Exams",
    description: "Competitive exam mentoring section is under development.",
  },
  scholarships: {
    title: "Scholarships",
    description: "Scholarships guidance module is under development.",
  },
  "feedback&Suggestions": {
    title: "Feedback & Suggestions",
    description: "Counselor feedback and suggestions panel is under development.",
  },
};

type MeResponse = {
  success: boolean;
  user?: {
    name?: string;
    role?: "student" | "counselor" | "admin";
    profile?: {
      profileImage?: string;
    };
  };
};

type CounselorOverview = {
  success: boolean;
  data: {
    counselorProfile: {
      displayName: string;
      bio: string;
      profileImage?: string;
      specializations: string[];
      languages: string[];
      rating: number;
    } | null;
    counters: {
      todaySessions: number;
      upcomingSessions: number;
      completedSessions: number;
      totalStudents: number;
    };
    recentSessions: SessionItem[];
  };
};

type SessionsResponse = {
  success: boolean;
  data: SessionItem[];
};

type SessionItem = {
  _id: string;
  type: string;
  scheduledAt: string;
  duration: number;
  status: "scheduled" | "in-progress" | "completed" | "cancelled" | "no-show";
  studentName: string;
  studentEmail: string;
  platform: string;
  location?: string;
};

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { credentials: "include", cache: "no-store" });
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json() as Promise<T>;
}

function getPlatformIcon(platform: string) {
  if (platform === "zoom" || platform === "google-meet" || platform === "video") return Video;
  if (platform === "phone" || platform === "audio") return Phone;
  return MapPin;
}

function formatStatus(status: string) {
  return status.replace("-", " ");
}

export default function CounselorDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<CounselorTab>("overview");
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [error, setError] = React.useState("");

  const [name, setName] = React.useState("Counselor");
  const [role, setRole] = React.useState("Counselor");
  const [profileImage, setProfileImage] = React.useState<string | undefined>(undefined);

  const [overview, setOverview] = React.useState<CounselorOverview["data"] | null>(null);
  const [sessions, setSessions] = React.useState<SessionItem[]>([]);
  const [allSessions, setAllSessions] = React.useState<SessionItem[]>([]);
  const [sessionFilter, setSessionFilter] = React.useState<"All" | SessionItem["status"]>("All");

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-indigo-400" },
    {
      id: "sessionOpsGroup",
      label: "Session Operations",
      icon: Calendar,
      color: "text-blue-400",
      children: [
        { id: "sessions", label: "Sessions", icon: Calendar, color: "text-blue-400" },
        { id: "counselingBooking", label: "Counseling Booking", icon: Clock, color: "text-cyan-400" },
        { id: "messages", label: "Messages", icon: MessageSquare, color: "text-cyan-400" },
      ],
    },
    {
      id: "studentGuidanceGroup",
      label: "Student Guidance",
      icon: Users,
      color: "text-emerald-400",
      children: [
        { id: "students", label: "Students", icon: Users, color: "text-emerald-400" },
        { id: "progressTracker", label: "Progress Tracker", icon: RefreshCw, color: "text-rose-400" },
        { id: "psychometricTest", label: "Psychometric Test", icon: Target, color: "text-purple-400" },
        { id: "shortListedColleges", label: "Short Listed Colleges", icon: Calendar, color: "text-teal-400" },
        { id: "carrerOption", label: "Career Options", icon: Briefcase, color: "text-emerald-400" },
      ],
    },
    {
      id: "govOpportunityGroup",
      label: "Gov & Opportunities",
      icon: GraduationCap,
      color: "text-blue-400",
      children: [
        { id: "govCollege", label: "Government Colleges", icon: GraduationCap, color: "text-blue-400" },
        { id: "scholarships", label: "Scholarships", icon: Award, color: "text-yellow-400" },
        { id: "competitiveExams", label: "Competitive Exams", icon: Award, color: "text-orange-400" },
      ],
    },
    {
      id: "qualityGroup",
      label: "Quality & Feedback",
      icon: MessageSquare,
      color: "text-violet-400",
      children: [{ id: "feedback&Suggestions", label: "Feedback & Suggestions", icon: MessageSquare, color: "text-violet-400" }],
    },
  ];

  const loadOverview = async () => {
    const result = await fetchJson<CounselorOverview>("/api/counselor/overview");
    setOverview(result.data);
  };

  const loadSessions = async (status: string = "All") => {
    const query = status !== "All" ? `?status=${encodeURIComponent(status)}` : "";
    const result = await fetchJson<SessionsResponse>(`/api/counselor/sessions${query}`);
    setSessions(result.data || []);
  };

  const loadAllSessions = async () => {
    const result = await fetchJson<SessionsResponse>("/api/counselor/sessions");
    setAllSessions(result.data || []);
  };

  const loadAll = async () => {
    setError("");
    setLoading(true);
    try {
      const me = await fetchJson<MeResponse>("/api/auth/me");
      if (me.success && me.user) {
        setName(me.user.name || "Counselor");
        setRole(me.user.role === "counselor" ? "Counselor" : me.user.role || "Counselor");
        setProfileImage(me.user.profile?.profileImage);
      }
      await Promise.all([loadOverview(), loadSessions(sessionFilter), loadAllSessions()]);
    } catch {
      setError("Failed to load counselor dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadAll();
  }, []);

  const refreshAll = async () => {
    setRefreshing(true);
    setError("");
    try {
      await Promise.all([loadOverview(), loadSessions(sessionFilter), loadAllSessions()]);
    } catch {
      setError("Refresh failed.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/login";
    }
  };

  const studentInsights = React.useMemo(() => {
    const map = new Map<string, { name: string; email: string; count: number; lastSession: string }>();

    allSessions.forEach((session) => {
      const key = session.studentEmail || session._id;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          name: session.studentName,
          email: session.studentEmail,
          count: 1,
          lastSession: session.scheduledAt,
        });
      } else {
        existing.count += 1;
        if (new Date(session.scheduledAt) > new Date(existing.lastSession)) {
          existing.lastSession = session.scheduledAt;
        }
      }
    });

    return Array.from(map.values()).sort((a, b) => b.count - a.count).slice(0, 12);
  }, [allSessions]);

  const overviewInsights = React.useMemo(() => {
    const totalSessions = allSessions.length;
    const completedCount = allSessions.filter((session) => session.status === "completed").length;
    const activeCount = allSessions.filter((session) => session.status === "scheduled" || session.status === "in-progress").length;
    const cancelledOrNoShowCount = allSessions.filter(
      (session) => session.status === "cancelled" || session.status === "no-show",
    ).length;

    const completionRate = totalSessions > 0 ? Math.round((completedCount / totalSessions) * 100) : 0;
    const avgDuration =
      totalSessions > 0
        ? Math.round(allSessions.reduce((sum, session) => sum + (session.duration || 0), 0) / totalSessions)
        : 0;

    const now = new Date();
    const nextSession = allSessions
      .filter((session) => new Date(session.scheduledAt) >= now && (session.status === "scheduled" || session.status === "in-progress"))
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())[0];

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const todayTimeline = allSessions
      .filter((session) => {
        const scheduledAt = new Date(session.scheduledAt);
        return scheduledAt >= todayStart && scheduledAt < todayEnd;
      })
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

    const typeCounts = allSessions.reduce<Record<string, number>>((acc, session) => {
      const key = session.type || "general";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const platformCounts = allSessions.reduce<Record<string, number>>((acc, session) => {
      const key = session.platform || "other";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const typeDistribution = Object.entries(typeCounts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const platformDistribution = Object.entries(platformCounts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalSessions,
      completedCount,
      activeCount,
      cancelledOrNoShowCount,
      completionRate,
      avgDuration,
      nextSession,
      todayTimeline,
      typeDistribution,
      platformDistribution,
    };
  }, [allSessions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="h-screen min-h-screen sticky top-0 left-0 z-20">
        <Sidebar
          menuItems={menuItems}
          activePage={activeTab}
          onPageChange={(id) => setActiveTab(id as CounselorTab)}
          userInfo={{ name, role, profileImage }}
          onLogout={handleLogout}
          onProfileClick={() => setActiveTab("profile")}
        />
      </div>

      <main className="flex-1 h-screen min-h-screen overflow-y-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Counselor Dashboard</h1>
            <p className="text-slate-600 mt-1">Manage sessions, student interactions, and counseling workflow.</p>
          </div>
          <button
            onClick={refreshAll}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 text-sm">{error}</div>
        ) : null}

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-white shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-indigo-100 text-sm">Counseling Command Center</p>
                  <h2 className="text-2xl font-bold mt-1">Welcome back, {overview?.counselorProfile?.displayName || name}</h2>
                  <p className="text-indigo-100 mt-2 text-sm">
                    Monitor session health, student engagement, and today’s priorities from one place.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 min-w-[280px]">
                  <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
                    <p className="text-xs text-indigo-100">Overall Completion</p>
                    <p className="text-2xl font-semibold">{overviewInsights.completionRate}%</p>
                  </div>
                  <div className="rounded-xl bg-white/10 border border-white/20 px-4 py-3">
                    <p className="text-xs text-indigo-100">Avg. Duration</p>
                    <p className="text-2xl font-semibold">{overviewInsights.avgDuration} min</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Today Sessions</p>
                  <Clock className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.todaySessions ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Upcoming</p>
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.upcomingSessions ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Completed</p>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.completedSessions ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Students Guided</p>
                  <Users className="w-5 h-5 text-cyan-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">{overview?.counters.totalStudents ?? 0}</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Active Cases</p>
                  <Activity className="w-5 h-5 text-violet-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">{overviewInsights.activeCount}</p>
                <p className="text-xs text-slate-500 mt-1">Scheduled + in-progress</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">Next Priority Session</h3>
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                </div>
                {!overviewInsights.nextSession ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">
                    No upcoming session is scheduled right now.
                  </div>
                ) : (
                  <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{overviewInsights.nextSession.studentName}</p>
                        <p className="text-xs text-slate-600">{overviewInsights.nextSession.studentEmail}</p>
                        <p className="text-sm text-slate-700 mt-1 capitalize">
                          {overviewInsights.nextSession.type.replace("-", " ")} • {overviewInsights.nextSession.duration} min
                        </p>
                      </div>
                      <div className="text-sm text-slate-700">
                        <p>{new Date(overviewInsights.nextSession.scheduledAt).toLocaleString()}</p>
                        <p className="mt-1 inline-flex items-center gap-1 capitalize">
                          {React.createElement(getPlatformIcon(overviewInsights.nextSession.platform), { className: "w-4 h-4" })}
                          {overviewInsights.nextSession.platform}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-semibold text-slate-900">Session Health</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex items-center justify-between text-slate-700 mb-1">
                      <span>Completed</span>
                      <span>{overviewInsights.completedCount}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${Math.max(overviewInsights.completionRate, 4)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Total Sessions</span>
                    <span className="font-semibold">{overviewInsights.totalSessions}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Cancelled / No-show</span>
                    <span className="font-semibold">{overviewInsights.cancelledOrNoShowCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Average Duration</span>
                    <span className="font-semibold">{overviewInsights.avgDuration} min</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-3">Recent Sessions</h3>
                {(overview?.recentSessions || []).length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                    No recent sessions available.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(overview?.recentSessions || []).slice(0, 6).map((session) => {
                      const PlatformIcon = getPlatformIcon(session.platform);
                      return (
                        <div key={session._id} className="border border-slate-200 rounded-lg p-3">
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="font-medium text-slate-800">{session.studentName}</p>
                              <p className="text-xs text-slate-500">{session.studentEmail}</p>
                            </div>
                            <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 capitalize">
                              {formatStatus(session.status)}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-3">
                            <span>{new Date(session.scheduledAt).toLocaleString()}</span>
                            <span>{session.duration} min</span>
                            <span className="inline-flex items-center gap-1">
                              <PlatformIcon className="w-3.5 h-3.5" /> {session.platform}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-semibold text-slate-900">Profile Snapshot</h3>
                </div>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-medium text-slate-900">{overview?.counselorProfile?.displayName || name}</p>
                  {overview?.counselorProfile?.bio ? <p>{overview.counselorProfile.bio}</p> : null}
                  <p className="inline-flex items-center gap-1 text-amber-600">
                    <Star className="w-4 h-4" />
                    Rating: {Number(overview?.counselorProfile?.rating || 0).toFixed(1)}
                  </p>
                  <p>Specializations: {(overview?.counselorProfile?.specializations || []).join(", ") || "Not set"}</p>
                  <p>Languages: {(overview?.counselorProfile?.languages || []).join(", ") || "Not set"}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Today Timeline</h3>
                </div>
                {overviewInsights.todayTimeline.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">
                    No sessions scheduled for today.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {overviewInsights.todayTimeline.slice(0, 6).map((session) => {
                      const PlatformIcon = getPlatformIcon(session.platform);
                      return (
                        <div key={session._id} className="flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2">
                          <div>
                            <p className="font-medium text-slate-800 text-sm">{session.studentName}</p>
                            <p className="text-xs text-slate-500 capitalize">{session.type.replace("-", " ")}</p>
                          </div>
                          <div className="text-right text-xs text-slate-600">
                            <p>{new Date(session.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                            <p className="inline-flex items-center gap-1 mt-0.5 capitalize">
                              <PlatformIcon className="w-3.5 h-3.5" /> {session.platform}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-slate-900">Session Type Distribution</h3>
                </div>
                {overviewInsights.typeDistribution.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">
                    Distribution will appear once sessions are available.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {overviewInsights.typeDistribution.map((item) => {
                      const percent =
                        overviewInsights.totalSessions > 0
                          ? Math.round((item.count / overviewInsights.totalSessions) * 100)
                          : 0;
                      return (
                        <div key={item.label}>
                          <div className="flex items-center justify-between text-sm text-slate-700 mb-1">
                            <span className="capitalize">{item.label.replace("-", " ")}</span>
                            <span>{item.count} ({percent}%)</span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${Math.max(percent, 5)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-cyan-600" />
                  <h3 className="font-semibold text-slate-900">Top Student Engagement</h3>
                </div>
                {studentInsights.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">
                    Engagement insights will appear once sessions are recorded.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {studentInsights.slice(0, 6).map((student, index) => (
                      <div key={`${student.email}-${index}`} className="rounded-lg border border-slate-200 p-3">
                        <p className="font-medium text-slate-800">{student.name}</p>
                        <p className="text-xs text-slate-500 truncate">{student.email}</p>
                        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                          <span>Sessions: {student.count}</span>
                          <span>Last: {new Date(student.lastSession).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-semibold text-slate-900">Delivery Mix</h3>
                </div>
                {overviewInsights.platformDistribution.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500 text-sm">
                    Platform mix will appear after session data is available.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {overviewInsights.platformDistribution.map((item) => (
                      <div key={item.label} className="flex items-center justify-between text-sm border border-slate-200 rounded-lg px-3 py-2">
                        <span className="capitalize text-slate-700">{item.label}</span>
                        <span className="font-semibold text-slate-900">{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Session Management</h3>
              <select
                value={sessionFilter}
                onChange={async (event) => {
                  const next = event.target.value as "All" | SessionItem["status"];
                  setSessionFilter(next);
                  await loadSessions(next);
                }}
                className="border border-slate-300 rounded px-3 py-2 text-sm"
              >
                <option value="All">All</option>
                <option value="scheduled">Scheduled</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no-show">No Show</option>
              </select>
            </div>

            {sessions.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No sessions found for selected filter.
              </div>
            ) : (
              <div className="overflow-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-slate-200 text-slate-500">
                      <th className="p-2">Student</th>
                      <th className="p-2">Type</th>
                      <th className="p-2">Date & Time</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Mode</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => {
                      const PlatformIcon = getPlatformIcon(session.platform);
                      return (
                        <tr key={session._id} className="border-b border-slate-100">
                          <td className="p-2">
                            <p className="font-medium text-slate-800">{session.studentName}</p>
                            <p className="text-xs text-slate-500">{session.studentEmail}</p>
                          </td>
                          <td className="p-2 capitalize">{session.type.replace("-", " ")}</td>
                          <td className="p-2">{new Date(session.scheduledAt).toLocaleString()}</td>
                          <td className="p-2">{session.duration} min</td>
                          <td className="p-2 capitalize inline-flex items-center gap-1">
                            <PlatformIcon className="w-4 h-4" /> {session.platform}
                          </td>
                          <td className="p-2">
                            <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 capitalize">
                              {formatStatus(session.status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Student Insights</h3>
            {studentInsights.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
                Student insights will appear once session history is available.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {studentInsights.map((student, index) => (
                  <div key={`${student.email}-${index}`} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircle2 className="w-4 h-4 text-slate-500" />
                      <p className="font-medium text-slate-800">{student.name}</p>
                    </div>
                    <p className="text-xs text-slate-500">{student.email}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                      <span>Sessions: {student.count}</span>
                      <span>{new Date(student.lastSession).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Messages & Follow-ups</h3>
            <p className="text-slate-600 mb-4">
              Initial communication panel is ready. In next phase this can be connected with real-time chat and reminders.
            </p>
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No messages yet.
            </div>
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800 text-sm">
              Professional counselor workspace is ready and can be extended with complete communication workflows.
            </div>
          </div>
        )}

        {activeTab in placeholderTabs && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {placeholderTabs[activeTab as PlaceholderCounselorTab].title}
              </h3>
            </div>
            <p className="text-slate-600">{placeholderTabs[activeTab as PlaceholderCounselorTab].description}</p>
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 p-6 text-slate-500 text-sm">
              Under Development
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
