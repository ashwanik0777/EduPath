"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileCog,
  RefreshCw,
  GraduationCap,
  Briefcase,
  CalendarDays,
  Award,
  UserCheck,
  Bell,
  Target,
  Clock,
  Wrench,
} from "lucide-react";
import { Sidebar, MenuItem } from "@/app/components/Sidebar";

type OverviewResponse = {
  success: boolean;
  data: {
    counters: {
      users: number;
      students: number;
      counselors: number;
      admins: number;
      colleges: number;
      careers: number;
      exams: number;
      scholarships: number;
      feedbacks: number;
      pendingFeedbacks: number;
    };
    recentUsers: AdminUser[];
    recentFeedbacks: AdminFeedback[];
  };
};

type AdminUser = {
  _id: string;
  name: string;
  email: string;
  role: "student" | "counselor" | "admin";
  isActive: boolean;
  createdAt?: string;
  lastLoginAt?: string;
};

type AdminFeedback = {
  _id: string;
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  status: "Pending" | "Reviewed" | "Responded";
  submitted_on?: string;
};

type UsersResponse = {
  success: boolean;
  data: AdminUser[];
};

type FeedbackResponse = {
  success: boolean;
  data: AdminFeedback[];
};

type MeResponse = {
  success: boolean;
  user?: {
    name?: string;
    role?: "student" | "counselor" | "admin";
    email?: string;
    profile?: {
      profileImage?: string;
    };
  };
};

type BaseTabKey = "overview" | "users" | "feedback" | "content";
type PlaceholderTabKey =
  | "profile"
  | "progressTracker"
  | "psychometricTest"
  | "govCollege"
  | "shortListedColleges"
  | "carrerOption"
  | "counselingBooking"
  | "competitiveExams"
  | "scholarships";
type TabKey = BaseTabKey | PlaceholderTabKey;

const placeholderTabs: Record<PlaceholderTabKey, { title: string; description: string }> = {
  profile: {
    title: "Profile",
    description: "Admin profile management module is under development.",
  },
  progressTracker: {
    title: "Progress Tracker",
    description: "Cross-role progress analytics module is under development.",
  },
  psychometricTest: {
    title: "Psychometric Test",
    description: "Psychometric test controls for admin are under development.",
  },
  govCollege: {
    title: "Government College",
    description: "Government college management section is under development.",
  },
  shortListedColleges: {
    title: "Short Listed College",
    description: "Short listed college admin tools are under development.",
  },
  carrerOption: {
    title: "Career Option",
    description: "Career option management panel is under development.",
  },
  counselingBooking: {
    title: "Counseling Booking",
    description: "Counseling booking management module is under development.",
  },
  competitiveExams: {
    title: "Competitive Exams",
    description: "Competitive exams admin controls are under development.",
  },
  scholarships: {
    title: "Scholarships",
    description: "Scholarships control panel is under development.",
  },
};

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json() as Promise<T>;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [overview, setOverview] = useState<OverviewResponse["data"] | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [feedbacks, setFeedbacks] = useState<AdminFeedback[]>([]);

  const [adminInfo, setAdminInfo] = useState<{ name: string; role: string; profileImage?: string }>({
    name: "Admin",
    role: "Admin",
    profileImage: undefined,
  });

  const [userSearch, setUserSearch] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"All" | "Pending" | "Reviewed" | "Responded">("All");

  const loadOverview = async () => {
    const result = await fetchJson<OverviewResponse>("/api/admin/overview");
    setOverview(result.data);
  };

  const loadUsers = async (query?: string) => {
    const q = query?.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    const result = await fetchJson<UsersResponse>(`/api/admin/users${q}`);
    setUsers(result.data || []);
  };

  const loadFeedbacks = async (status?: string) => {
    const query = status && status !== "All" ? `?status=${encodeURIComponent(status)}` : "";
    const result = await fetchJson<FeedbackResponse>(`/api/admin/feedback${query}`);
    setFeedbacks(result.data || []);
  };

  const loadAll = async () => {
    setError("");
    setLoading(true);
    try {
      const me = await fetchJson<MeResponse>("/api/auth/me");
      if (me.success && me.user) {
        setAdminInfo({
          name: me.user.name || "Admin",
          role: me.user.role === "admin" ? "Admin" : me.user.role || "Admin",
          profileImage: me.user.profile?.profileImage,
        });
      }
      await Promise.all([loadOverview(), loadUsers(), loadFeedbacks()]);
    } catch {
      setError("Failed to load admin data. Please refresh.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const refreshAll = async () => {
    setRefreshing(true);
    setError("");
    try {
      await Promise.all([loadOverview(), loadUsers(userSearch), loadFeedbacks(feedbackStatus)]);
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

  const updateUserRole = async (userId: string, role: AdminUser["role"]) => {
    try {
      await fetchJson("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({ userId, role }),
      });
      await loadUsers(userSearch);
      await loadOverview();
    } catch {
      setError("Could not update user role.");
    }
  };

  const toggleUserActive = async (user: AdminUser) => {
    try {
      await fetchJson("/api/admin/users", {
        method: "PATCH",
        body: JSON.stringify({ userId: user._id, isActive: !user.isActive }),
      });
      await loadUsers(userSearch);
    } catch {
      setError("Could not update user status.");
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, status: AdminFeedback["status"]) => {
    try {
      await fetchJson("/api/admin/feedback", {
        method: "PATCH",
        body: JSON.stringify({ feedbackId, status }),
      });
      await loadFeedbacks(feedbackStatus);
      await loadOverview();
    } catch {
      setError("Could not update feedback status.");
    }
  };

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-indigo-400" },
    { id: "users", label: "Users", icon: Users, color: "text-blue-400" },
    { id: "feedback", label: "Feedback", icon: MessageSquare, color: "text-cyan-400" },
    { id: "content", label: "Content", icon: FileCog, color: "text-emerald-400" },
    { id: "profile", label: "Profile", icon: Users, color: "text-gray-400" },
    { id: "progressTracker", label: "Progress Tracker", icon: RefreshCw, color: "text-rose-400" },
    { id: "psychometricTest", label: "Psychometric Test", icon: Target, color: "text-purple-400" },
    { id: "govCollege", label: "Government College", icon: GraduationCap, color: "text-blue-400" },
    { id: "shortListedColleges", label: "Short Listed College", icon: CalendarDays, color: "text-teal-400" },
    { id: "carrerOption", label: "Career Option", icon: Briefcase, color: "text-emerald-400" },
    { id: "counselingBooking", label: "Counseling Booking", icon: Clock, color: "text-cyan-400" },
    { id: "competitiveExams", label: "Competitive Exams", icon: Award, color: "text-orange-400" },
    { id: "scholarships", label: "Scholarships", icon: GraduationCap, color: "text-yellow-400" },
  ];

  const metricCards = useMemo(
    () => [
      { label: "Users", value: overview?.counters.users ?? 0, icon: Users, color: "bg-blue-50 text-blue-700" },
      { label: "Colleges", value: overview?.counters.colleges ?? 0, icon: GraduationCap, color: "bg-violet-50 text-violet-700" },
      { label: "Careers", value: overview?.counters.careers ?? 0, icon: Briefcase, color: "bg-emerald-50 text-emerald-700" },
      { label: "Exams", value: overview?.counters.exams ?? 0, icon: CalendarDays, color: "bg-amber-50 text-amber-700" },
      { label: "Scholarships", value: overview?.counters.scholarships ?? 0, icon: Award, color: "bg-pink-50 text-pink-700" },
      { label: "Pending Feedback", value: overview?.counters.pendingFeedbacks ?? 0, icon: Bell, color: "bg-cyan-50 text-cyan-700" },
    ],
    [overview],
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="h-screen min-h-screen sticky top-0 left-0 z-20">
        <Sidebar
          menuItems={menuItems}
          activePage={activeTab}
          onPageChange={(id) => setActiveTab(id as TabKey)}
          userInfo={{ name: adminInfo.name, role: adminInfo.role, profileImage: adminInfo.profileImage }}
          onLogout={handleLogout}
        />
      </div>

      <main className="flex-1 h-screen min-h-screen overflow-y-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="text-slate-600">Manage students, website data, and platform feedback</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {metricCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-500">{card.label}</p>
                        <p className="text-3xl font-bold text-slate-900">{card.value}</p>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-3">Recent Users</h3>
                <div className="space-y-2">
                  {(overview?.recentUsers || []).map((user) => (
                    <div key={user._id} className="border border-slate-200 rounded-lg p-3">
                      <p className="font-medium text-slate-800">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-700">{user.role}</span>
                        <span className={user.isActive ? "text-emerald-600" : "text-rose-600"}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <h3 className="font-semibold text-slate-900 mb-3">Recent Feedback</h3>
                <div className="space-y-2">
                  {(overview?.recentFeedbacks || []).map((item) => (
                    <div key={item._id} className="border border-slate-200 rounded-lg p-3">
                      <p className="text-sm text-slate-700 line-clamp-2">{item.message || "No message"}</p>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span>{item.type || "General"}</span>
                        <span className="px-2 py-1 rounded bg-slate-100">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
              <div className="flex gap-2">
                <input
                  value={userSearch}
                  onChange={(event) => setUserSearch(event.target.value)}
                  placeholder="Search by name or email"
                  className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                />
                <button
                  onClick={() => loadUsers(userSearch)}
                  className="rounded-lg bg-slate-900 text-white px-3 py-2 text-sm"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-200 text-slate-500">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Role</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-slate-100">
                      <td className="p-2 font-medium text-slate-800">{user.name}</td>
                      <td className="p-2 text-slate-600">{user.email}</td>
                      <td className="p-2">
                        <select
                          value={user.role}
                          onChange={(event) => updateUserRole(user._id, event.target.value as AdminUser["role"])}
                          className="border border-slate-300 rounded px-2 py-1"
                        >
                          <option value="student">student</option>
                          <option value="counselor">counselor</option>
                          <option value="admin">admin</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-xs ${user.isActive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => toggleUserActive(user)}
                          className="inline-flex items-center gap-1 rounded border border-slate-300 px-2 py-1 hover:bg-slate-50"
                        >
                          <UserCheck className="w-4 h-4" />
                          Toggle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Feedback Management</h3>
              <div className="flex gap-2 items-center">
                <select
                  value={feedbackStatus}
                  onChange={(event) => {
                    const selected = event.target.value as "All" | "Pending" | "Reviewed" | "Responded";
                    setFeedbackStatus(selected);
                    loadFeedbacks(selected);
                  }}
                  className="border border-slate-300 rounded px-2 py-2 text-sm"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Responded">Responded</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {feedbacks.map((item) => (
                <div key={item._id} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div>
                      <p className="font-medium text-slate-900">{item.name || "Anonymous"}</p>
                      <p className="text-xs text-slate-500">{item.email || "No email"}</p>
                    </div>
                    <select
                      value={item.status}
                      onChange={(event) => updateFeedbackStatus(item._id, event.target.value as AdminFeedback["status"])}
                      className="border border-slate-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Responded">Responded</option>
                    </select>
                  </div>
                  <p className="text-sm text-slate-700">{item.message || "No message"}</p>
                  <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
                    <span>{item.type || "General"}</span>
                    <span>{item.submitted_on ? new Date(item.submitted_on).toLocaleString() : "-"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Link href="/notifications/scholarship" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Scholarship Notifications</h4>
              <p className="text-sm text-slate-600">Manage scholarship updates visible to students.</p>
            </Link>
            <Link href="/notifications/examDate" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Exam Notifications</h4>
              <p className="text-sm text-slate-600">Review exam dates and important announcements.</p>
            </Link>
            <Link href="/notifications/counselingSchedule" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Counseling Notifications</h4>
              <p className="text-sm text-slate-600">Track counseling sessions and schedules.</p>
            </Link>
            <a href="/api/careers" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Careers Data API</h4>
              <p className="text-sm text-slate-600">View current career catalog records.</p>
            </a>
            <a href="/api/exams" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Exams Data API</h4>
              <p className="text-sm text-slate-600">View exam records used on website modules.</p>
            </a>
            <a href="/api/scholarships" className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:bg-slate-50">
              <h4 className="font-semibold text-slate-900 mb-1">Scholarships Data API</h4>
              <p className="text-sm text-slate-600">View scholarship records used on website modules.</p>
            </a>
          </div>
        )}

        {activeTab in placeholderTabs && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                {placeholderTabs[activeTab as PlaceholderTabKey].title}
              </h3>
            </div>
            <p className="text-slate-600">{placeholderTabs[activeTab as PlaceholderTabKey].description}</p>
            <div className="mt-5 rounded-lg border border-dashed border-slate-300 p-6 text-slate-500 text-sm">
              Under Development
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
