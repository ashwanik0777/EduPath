"use client"
import Link from "next/link"
import { CheckCircle2, Rocket, BookOpen, FileText, Users, Award, ArrowRight } from "lucide-react"

const perks = [
  "Access 500+ curated study resources across all streams",
  "Free NCERT PDFs, mock tests, and video lectures",
  "AI-powered resume builder and interview prep tools",
  "Real-time scholarship alerts — never miss a deadline",
  "Expert career counselling to guide your path forward",
  "Track progress and get personalised learning suggestions",
]

const stats = [
  { icon: BookOpen, label: "Resources", value: "500+" },
  { icon: FileText, label: "Mock Tests", value: "100+" },
  { icon: Users, label: "Students", value: "2M+" },
  { icon: Award, label: "Counsellors", value: "5000+" },
]

export default function CTAResources() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
            <Rocket className="w-4 h-4" />
            Start Learning Today
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-700 via-indigo-600 to-violet-700 bg-clip-text text-transparent">
            Unlock Your Full Potential
          </h2>
          
        </div>

        {/* Split card */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl grid lg:grid-cols-2">
          {/* Left — checklist */}
          <div className="bg-white p-10 flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800">Everything You Get — Free</h3>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border-2 border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                <Rocket className="w-4 h-4" />
                Join Free
              </Link>
              <Link
                href="/careerAssessment"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                Take Career Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right — dark gradient */}
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 p-10 flex flex-col justify-between gap-8">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-1 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center mb-2">
                    <Icon className="w-4 h-4 text-violet-300" />
                  </div>
                  <p className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">{value}</p>
                  <p className="text-xs text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                Start your journey today — whether it’s cracking UPSC, landing your first job, or learning a new skill, EduPath has you covered.
              </p>
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold bg-gradient-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-400 hover:to-indigo-400 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/30 transition-all duration-200"
              >
                Start Learning Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
