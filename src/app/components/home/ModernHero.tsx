"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Compass,
  Sparkles,
  Users,
  GraduationCap,
  Brain,
  Trophy,
  ActivitySquare,
  TrendingUp,
} from "lucide-react";

const dashboardStats = [
  {
    label: "Students Guided",
    target: 10,
    suffix: "k+",
    icon: GraduationCap,
    iconColor: "text-indigo-600",
    bg: "from-indigo-50 to-blue-50",
    border: "border-indigo-100",
    labelColor: "text-indigo-700",
    iconBg: "bg-indigo-100",
  },
  {
    label: "Expert Counselors",
    target: 250,
    suffix: "+",
    icon: Users,
    iconColor: "text-cyan-600",
    bg: "from-cyan-50 to-teal-50",
    border: "border-cyan-100",
    labelColor: "text-cyan-700",
    iconBg: "bg-cyan-100",
  },
  {
    label: "Assessments Taken",
    target: 50,
    suffix: "k+",
    icon: Brain,
    iconColor: "text-emerald-600",
    bg: "from-emerald-50 to-green-50",
    border: "border-emerald-100",
    labelColor: "text-emerald-700",
    iconBg: "bg-emerald-100",
  },
  {
    label: "Success Pathways",
    target: 95,
    suffix: "%",
    icon: Trophy,
    iconColor: "text-violet-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    labelColor: "text-violet-700",
    iconBg: "bg-violet-100",
  },
];

function useCountUp(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [started, target, duration]);

  return count;
}

function StatCard({
  stat,
  index,
  started,
}: {
  stat: (typeof dashboardStats)[number];
  index: number;
  started: boolean;
}) {
  const count = useCountUp(stat.target, 1400 + index * 150, started);
  const Icon = stat.icon;

  return (
    <div
      className={`group relative rounded-2xl bg-gradient-to-br ${stat.bg} border ${stat.border} p-4 md:p-5 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 overflow-hidden`}
    >
      {/* subtle corner glow */}
      <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-white/40 blur-xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-2">
        <span className={`w-8 h-8 rounded-lg ${stat.iconBg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${stat.iconColor}`} strokeWidth={2} />
        </span>
        <p className={`text-xs font-semibold ${stat.labelColor} leading-tight`}>{stat.label}</p>
      </div>

      <p className="text-2xl md:text-3xl font-black text-slate-900 tabular-nums tracking-tight">
        {count}
        {stat.suffix}
      </p>
    </div>
  );
}

export default function ModernHero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Hero is always visible — start after a short delay for polish
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 500px at 20% 20%, rgba(59,130,246,0.22), transparent 60%), radial-gradient(900px 500px at 85% 10%, rgba(79,70,229,0.2), transparent 60%), linear-gradient(135deg, #f8fafc 0%, #eef2ff 45%, #ecfeff 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — text */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
              <Sparkles className="w-3.5 h-3.5" />
              Future-ready Career Intelligence
            </span>

            <h1 className="mt-5 text-4xl md:text-6xl font-black text-slate-900 leading-[1.05]">
              Design your career path with
              <span className="text-indigo-700"> confidence</span>.
            </h1>

            <p className="mt-5 text-slate-600 text-base md:text-lg max-w-xl">
              EduPath helps students discover strengths, compare opportunities, and connect with expert counselors in one
              modern platform built for outcomes.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/careerAssessment"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 font-semibold hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/studyResources"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white text-slate-800 px-5 py-3 font-semibold hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore Resources
                <Compass className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right — Dashboard card */}
          <div className="relative bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200 p-5 md:p-7 shadow-2xl shadow-slate-200/60">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Live Stats</p>
                <p className="text-lg font-bold text-slate-800 mt-0.5">Outcome Dashboard</p>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </span>
            </div>

            {/* Stats grid with counters */}
            <div className="grid grid-cols-2 gap-3">
              {dashboardStats.map((stat, i) => (
                <StatCard key={i} stat={stat} index={i} started={started} />
              ))}
            </div>

            {/* Footer strip */}
            <div className="mt-5 rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 to-indigo-50/40 p-4 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <ActivitySquare className="w-4 h-4 text-indigo-600" />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-700">Live mentoring ecosystem</p>
                <p className="text-xs text-slate-400 mt-0.5">For students, parents &amp; counselors</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-600">+12%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
