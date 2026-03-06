"use client"
import { CheckCircle, BarChart2, Layers, FileText, Sparkles } from "lucide-react"

const points = [
  {
    title: "Scientific & Reliable",
    tagline: "Globally validated",
    desc: "Meticulously designed tests based on global career frameworks, validated by expert psychologists and educators worldwide.",
    icon: CheckCircle,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    topBar: "from-violet-500 to-purple-600",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    title: "Personalized Insights",
    tagline: "Made just for you",
    desc: "Get deep, data-backed insights about your career interests, natural strengths, and personality traits — unique to you.",
    icon: BarChart2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    topBar: "from-blue-500 to-cyan-500",
    badge: "bg-blue-100 text-blue-700",
  },
  {
    title: "For Every Stage",
    tagline: "School to career",
    desc: "Whether you are in Class 9, preparing for college, or a working professional — we have the perfect assessment for you.",
    icon: Layers,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    topBar: "from-emerald-500 to-teal-500",
    badge: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Instant Reports",
    tagline: "No waiting",
    desc: "Receive your detailed assessment report immediately after completion — with AI-matched career path recommendations.",
    icon: FileText,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    topBar: "from-amber-500 to-orange-500",
    badge: "bg-amber-100 text-amber-700",
  },
]

export default function WhyAssessment() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Why EduPath Assessments?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Built for{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Our assessments are not generic tests — they are scientifically engineered experiences that uncover your true potential.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map(({ title, tagline, desc, icon: Icon, iconColor, iconBg, border, hoverBorder, topBar, badge }, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${border} ${hoverBorder} p-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${topBar} rounded-t-3xl`} />

              <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full ${badge} mb-5 mt-1`}>
                {tagline}
              </span>

              <div className={`relative w-16 h-16 rounded-2xl ${iconBg} border ${border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <div className={`absolute top-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r ${topBar} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.8} />
              </div>

              <h3 className="text-lg font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>

              <div className={`mt-5 h-[2px] rounded-full bg-gradient-to-r ${topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
