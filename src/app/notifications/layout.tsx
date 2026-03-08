"use client";
import React from "react";
import { Bell, Award, Calendar, Users, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    path: "/notifications/scholarship",
    label: "Scholarships",
    icon: Award,
    color: "text-amber-600",
    activeBg: "bg-amber-50 border-amber-400 text-amber-700",
    indicator: "bg-amber-500",
    heroFrom: "from-amber-600",
    heroTo: "to-orange-500",
    subtitle: "Discover government & private scholarships tailored for you. Never miss a deadline.",
  },
  {
    path: "/notifications/examDate",
    label: "Exam Dates",
    icon: Calendar,
    color: "text-blue-600",
    activeBg: "bg-blue-50 border-blue-400 text-blue-700",
    indicator: "bg-blue-500",
    heroFrom: "from-blue-600",
    heroTo: "to-indigo-500",
    subtitle: "Stay ahead with upcoming exam schedules, registration deadlines & admit card dates.",
  },
  {
    path: "/notifications/counselingSchedule",
    label: "Counseling",
    icon: Users,
    color: "text-violet-600",
    activeBg: "bg-violet-50 border-violet-400 text-violet-700",
    indicator: "bg-violet-500",
    heroFrom: "from-violet-600",
    heroTo: "to-indigo-500",
    subtitle: "Track your counseling sessions, join live calls & manage your schedule effortlessly.",
  },
];

const NotificationLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const active = tabs.find((t) => t.path === pathname) || tabs[0];
  const ActiveIcon = active.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── Hero Banner ── */}
      <div className={`bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 py-14 px-6`}>
        <div className="max-w-6xl mx-auto">
          {/* Pill */}
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-semibold backdrop-blur-sm">
              <Bell className="w-4 h-4" />
              Notifications Center
            </span>
          </div>

          {/* Title */}
          <div className="text-center space-y-3 mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${active.heroFrom} ${active.heroTo} flex items-center justify-center shadow-lg`}>
                <ActiveIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                {active.label}
              </h1>
            </div>
            <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
              {active.subtitle}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map(({ path, label, icon: Icon, activeBg, indicator }) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                    isActive
                      ? `${activeBg} shadow-md`
                      : "border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/25"
                  }`}
                >
                 
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        {children}
      </div>
    </div>
  );
};

export default NotificationLayout;