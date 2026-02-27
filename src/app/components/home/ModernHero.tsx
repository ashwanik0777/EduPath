import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Users } from "lucide-react";

export default function ModernHero() {
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
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 font-semibold hover:bg-indigo-700 transition-colors"
              >
                Start Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/studyResources"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white text-slate-800 px-5 py-3 font-semibold hover:bg-slate-50 transition-colors"
              >
                Explore Resources
                <Compass className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl border border-slate-200 p-5 md:p-7 shadow-xl">
            <p className="text-sm text-slate-500">Outcome Dashboard</p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4">
                <p className="text-xs text-indigo-700">Students Guided</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">10k+</p>
              </div>
              <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4">
                <p className="text-xs text-cyan-700">Expert Counselors</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">250+</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
                <p className="text-xs text-emerald-700">Assessments Taken</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">50k+</p>
              </div>
              <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4">
                <p className="text-xs text-violet-700">Success Pathways</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">95%</p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                Live mentoring ecosystem for students, parents and counselors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
