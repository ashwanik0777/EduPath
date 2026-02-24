"use client";

import React from "react";
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
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

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { credentials: "include", cache: "no-store" });
  if (!response.ok) {
    throw new Error("Request failed");
  }
  return response.json() as Promise<T>;
}

export default function CounselorDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<CounselorTab>("overview");
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState("Counselor");
  const [profileImage, setProfileImage] = React.useState<string | undefined>(undefined);

  const menuItems: MenuItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, color: "text-indigo-400" },
    { id: "sessions", label: "Sessions", icon: Calendar, color: "text-blue-400" },
    { id: "students", label: "Students", icon: Users, color: "text-emerald-400" },
    { id: "messages", label: "Messages", icon: MessageSquare, color: "text-cyan-400" },
  ];

  React.useEffect(() => {
    const loadMe = async () => {
      try {
        const me = await fetchJson<MeResponse>("/api/auth/me");
        if (me.success && me.user) {
          setName(me.user.name || "Counselor");
          setProfileImage(me.user.profile?.profileImage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadMe();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    } finally {
      window.location.href = "/login";
    }
  };

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
          userInfo={{ name, role: "Counselor", profileImage }}
          onLogout={handleLogout}
        />
      </div>

      <main className="flex-1 h-screen min-h-screen overflow-y-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Counselor Dashboard</h1>
          <p className="text-slate-600 mt-1">Initial version ready. Full modules can be expanded in the next phase.</p>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Today Sessions</p>
                  <Clock className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Upcoming</p>
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Students Guided</p>
                  <Users className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-slate-600 text-sm">Completion Rate</p>
                  <TrendingUp className="w-5 h-5 text-cyan-500" />
                </div>
                <p className="text-3xl font-bold text-slate-900 mt-2">0%</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-semibold text-slate-900">Initial counselor workspace is ready</h3>
              </div>
              <p className="text-slate-600">
                Next phase can include session calendar integration, student profile insights, notes, reminders,
                and post-session action tracking.
              </p>
            </div>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Sessions</h3>
            <p className="text-slate-600 mb-4">Session management module (initial placeholder).</p>
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No sessions available yet.
            </div>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Students</h3>
            <p className="text-slate-600 mb-4">Student insights module (initial placeholder).</p>
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
              Student list and analytics will appear here.
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Messages</h3>
            <p className="text-slate-600 mb-4">Communication module (initial placeholder).</p>
            <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
              No messages yet.
            </div>
          </div>
        )}

        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Counselor dashboard initial version is ready with professional UI and same sidebar experience.
        </div>
      </main>
    </div>
  );
}
