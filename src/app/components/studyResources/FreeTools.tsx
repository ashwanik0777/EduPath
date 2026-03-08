"use client"
import { BookOpen, Youtube, FileText, Edit, BellRing, Zap, ArrowRight } from "lucide-react"

const tools = [
  {
    icon: BookOpen,
    name: "NCERT PDFs",
    desc: "Free NCERT books & solutions for all classes",
    details: "Download comprehensive textbooks to boost your exam preparation instantly.",
    tag: "Free Download",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50 border-violet-200",
    border: "border-violet-200", hoverBorder: "hover:border-violet-300",
    accent: "from-violet-500 to-violet-600",
    tagClass: "bg-violet-100 text-violet-700",
    btnClass: "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  {
    icon: Youtube,
    name: "YouTube Study Channels",
    desc: "Top free channels for JEE, NEET & UPSC",
    details: "Stay updated with expert tutorials, live sessions and concept videos.",
    tag: "Video",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50 border-rose-200",
    border: "border-rose-200", hoverBorder: "hover:border-rose-300",
    accent: "from-rose-500 to-rose-600",
    tagClass: "bg-rose-100 text-rose-700",
    btnClass: "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100",
  },
  {
    icon: FileText,
    name: "Mock Test Platform",
    desc: "Attempt free mock tests for various exams",
    details: "Practice with real exam-pattern tests and detailed performance analytics.",
    tag: "Free Tests",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50 border-blue-200",
    border: "border-blue-200", hoverBorder: "hover:border-blue-300",
    accent: "from-blue-500 to-blue-600",
    tagClass: "bg-blue-100 text-blue-700",
    btnClass: "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    icon: Edit,
    name: "AI Resume Builder",
    desc: "AI-powered free resume creation tool",
    details: "Create professional resumes in minutes, tailored for your target role and field.",
    tag: "AI Powered",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50 border-emerald-200",
    border: "border-emerald-200", hoverBorder: "hover:border-emerald-300",
    accent: "from-emerald-500 to-emerald-600",
    tagClass: "bg-emerald-100 text-emerald-700",
    btnClass: "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
  {
    icon: BellRing,
    name: "Scholarship Alerts",
    desc: "Get notified of all govt. scholarships instantly",
    details: "Never miss out on timely opportunities to fund your higher education.",
    tag: "Live Alerts",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50 border-amber-200",
    border: "border-amber-200", hoverBorder: "hover:border-amber-300",
    accent: "from-amber-500 to-amber-600",
    tagClass: "bg-amber-100 text-amber-700",
    btnClass: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100",
  },
]

export default function FreeTools() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
            <Zap className="w-4 h-4" />
            100% Free Access
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
            Free Tools & Study Materials
          </h2>
          
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(({ icon: Icon, name, desc, details, tag, iconColor, iconBg, border, hoverBorder, accent, tagClass, btnClass }, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${border} ${hoverBorder} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden`}
              aria-label={`Free tool: ${name}`}
            >
              {/* Accents */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accent} rounded-t-3xl`} />
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Tag */}
              <div className="flex items-center justify-between pt-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagClass}`}>{tag}</span>
              </div>

              {/* Icon */}
              <div className={`relative w-14 h-14 rounded-2xl border ${iconBg} flex items-center justify-center`}>
                <div className="absolute top-0 left-2 right-2 h-[2px] bg-gradient-to-r from-white/0 via-white to-white/0 rounded-full" />
                <Icon className={`w-7 h-7 ${iconColor} group-hover:scale-110 transition-transform duration-200`} strokeWidth={1.8} />
              </div>

              {/* Text */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-800">{name}</h3>
                <p className="text-sm font-medium text-slate-600">{desc}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{details}</p>
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border-2 ${btnClass} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
              >
                Access Free
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
