"use client"
import { ShieldCheck, Zap, HeartHandshake, Star, Sparkles } from "lucide-react"

const values = [
  {
    title: "Integrity",
    tagline: "Honest to the core",
    desc: "We believe in radical transparency and honesty in every counselling session and every interaction with our students.",
    icon: ShieldCheck,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    topBar: "from-violet-500 to-purple-600",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    title: "Innovation",
    tagline: "Always a step ahead",
    desc: "We leverage the latest AI tools, psychometric assessments, and counselling methods to deliver cutting-edge guidance.",
    icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    topBar: "from-amber-500 to-orange-500",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    title: "Empathy",
    tagline: "Students first, always",
    desc: "We deeply understand and respect every individual's unique career journey, fears, and aspirations without judgment.",
    icon: HeartHandshake,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    topBar: "from-rose-500 to-pink-600",
    badge: "bg-rose-100 text-rose-700",
  },
  {
    title: "Excellence",
    tagline: "Measurable, real impact",
    desc: "We strive to deliver world-class services with real, measurable outcomes at every stage of the counselling process.",
    icon: Star,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    topBar: "from-blue-500 to-cyan-500",
    badge: "bg-blue-100 text-blue-700",
  },
]

export default function Values() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            What We Stand For
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Our Core{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Values
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            The principles that guide every decision, conversation, and interaction we have with our students.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ title, tagline, desc, icon: Icon, iconColor, iconBg, border, hoverBorder, topBar, badge }, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${border} ${hoverBorder} p-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${topBar} rounded-t-3xl`} />

              {/* Badge */}
              <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full ${badge} mb-5 mt-1`}>
                {tagline}
              </span>

              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-2xl ${iconBg} border ${border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <div className={`absolute top-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r ${topBar} opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
                <Icon className={`w-8 h-8 ${iconColor}`} strokeWidth={1.8} />
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">{desc}</p>

              {/* Bottom accent on hover */}
              <div className={`mt-5 h-[2px] rounded-full bg-gradient-to-r ${topBar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
