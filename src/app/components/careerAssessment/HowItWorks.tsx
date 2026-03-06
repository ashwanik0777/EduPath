"use client"
import { ClipboardList, Edit3, FileText, Headphones, Sparkles, ArrowRight } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Choose Your Assessment",
    desc: "Browse our tests and pick the one that best matches your current education level or career stage.",
    icon: ClipboardList,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-200",
    numColor: "text-violet-100",
    topBar: "from-violet-500 to-purple-600",
    connector: true,
  },
  {
    step: "02",
    title: "Attempt Online Test",
    desc: "Answer expert-designed questions in 30–60 minutes, at your own pace, from any device.",
    icon: Edit3,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-200",
    numColor: "text-blue-100",
    topBar: "from-blue-500 to-cyan-500",
    connector: true,
  },
  {
    step: "03",
    title: "Get Your Instant Report",
    desc: "Receive a detailed, AI-powered career insights report immediately upon completion — no waiting.",
    icon: FileText,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-200",
    numColor: "text-emerald-100",
    topBar: "from-emerald-500 to-teal-500",
    connector: true,
  },
  {
    step: "04",
    title: "Get Counselling Support",
    desc: "Book a 1-on-1 session with a certified counsellor to turn your report into a concrete action plan.",
    icon: Headphones,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-200",
    numColor: "text-amber-100",
    topBar: "from-amber-500 to-orange-500",
    connector: false,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            How It{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            From start to your personalized career report — a simple 4-step journey that takes under an hour.
          </p>
        </div>

        {/* Desktop: horizontal connector line + cards */}
        <div className="relative">
          {/* Connector line behind cards (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-violet-300 via-emerald-300 to-amber-300 z-0" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map(({ step, title, desc, icon: Icon, iconColor, iconBg, border, numColor, topBar }, i) => (
              <div
                key={i}
                className={`group relative bg-white rounded-3xl border-2 ${border} hover:border-opacity-80 p-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden`}
              >
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${topBar} rounded-t-3xl`} />

                {/* Step watermark */}
                <div className={`absolute top-3 right-4 text-6xl font-black ${numColor} select-none`}>{step}</div>

                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl ${iconBg} border ${border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm z-10`}>
                  <div className={`absolute top-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r ${topBar} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                  <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.8} />
                </div>

                {/* Step badge */}
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 self-start mb-3`}>Step {step}</span>

                <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>

                <div className={`mt-5 h-[2px] rounded-full bg-gradient-to-r ${topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA nudge */}
        <div className="mt-12 text-center">
          <a
            href="#assessments"
            className="inline-flex items-center gap-2 border-2 border-indigo-300 bg-indigo-50 text-indigo-700 font-semibold px-7 py-3 rounded-2xl hover:bg-indigo-100 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
          >
            Browse Assessments
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
