"use client";

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  Sparkles,
  RefreshCw,
  Video,
  Phone,
  MapPin,
  CheckCircle2,
  UserCircle2,
  Star,
} from "lucide-react";
import { Sidebar, MenuItem } from "@/app/components/Sidebar";

type CounselorTab = "overview" | "sessions" | "students" | "messages";

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
  const [sessionFilter, setSessionFilter] = React.useState<"All" | SessionItem["status"]>("All");

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-indigo-400" },
    { id: "sessions", label: "Sessions", icon: Calendar, color: "text-blue-400" },
    { id: "students", label: "Students", icon: Users, color: "text-emerald-400" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "text-cyan-400" },
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
      await Promise.all([loadOverview(), loadSessions(sessionFilter)]);
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
      await Promise.all([loadOverview(), loadSessions(sessionFilter)]);
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

    sessions.forEach((session) => {
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
  }, [sessions]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
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
      </main>
    </div>
  );
}
