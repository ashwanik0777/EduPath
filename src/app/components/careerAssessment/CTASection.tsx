"use client"
import { ArrowRight, CheckCircle2, ClipboardList, FileText, Headphones, Star, Sparkles } from "lucide-react"
import Link from "next/link"

const miniSteps = [
  { icon: ClipboardList, label: "Choose a Test", color: "text-violet-300", bg: "bg-violet-900/50" },
  { icon: FileText, label: "Get Your Report", color: "text-blue-300", bg: "bg-blue-900/50" },
  { icon: Headphones, label: "Talk to Expert", color: "text-emerald-300", bg: "bg-emerald-900/50" },
  { icon: Star, label: "Achieve Goals", color: "text-amber-300", bg: "bg-amber-900/50" },
]

const perks = [
  "Free initial consultation available",
  "Instant downloadable PDF report",
  "No hidden charges or subscriptions",
  "Counsellor support within 24 hours",
]

export default function CTASection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Start Today
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Your Career Journey{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Starts Here
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Take your first step today — it only takes 30 minutes to discover a lifetime of direction.
          </p>
        </div>

        {/* Split card */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-2xl grid lg:grid-cols-2">
          {/* Left: perks list */}
          <div className="bg-white p-10 md:p-14 flex flex-col justify-center">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Why Start Today?</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Every day without direction is a day spent guessing. Our assessments give you clarity fast.
            </p>
            <ul className="space-y-4 mb-10">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-none">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" strokeWidth={2} />
                  </div>
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#assessments"
                className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border-2 border-indigo-300 bg-indigo-50 text-indigo-700 font-bold text-sm hover:bg-indigo-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
              >
                Browse Tests
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: CTA dark panel */}
          <div className="bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-800 p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />

            <div className="relative">
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-4">How It Works</p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {miniSteps.map(({ icon: Icon, label, color, bg }) => (
                  <div key={label} className={`flex items-center gap-3 rounded-2xl ${bg} border border-white/10 p-3`}>
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-none">
                      <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.8} />
                    </div>
                    <span className="text-white/80 text-xs font-semibold leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative space-y-4">
              <Link
                href="/buy"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white text-indigo-700 font-bold text-base hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
              >
                Start Assessment — ₹1,000
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/counselorDashboard"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/10 text-white font-semibold text-base border border-white/20 hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                Book a Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-white/40 text-xs text-center pt-1">50% off today &bull; Instant access &bull; No subscription</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
