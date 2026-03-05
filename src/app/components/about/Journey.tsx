"use client"
import { motion } from "framer-motion"
import { Flag, Star, Users, Trophy, CheckCircle, Sparkles, ArrowRight } from "lucide-react"

const timeline = [
  {
    year: "2011",
    event: "EduPath Was Founded",
    icon: Flag,
    description: "Started with a bold vision to empower students with career insights and expert guidance, changing the narrative around career decisions forever.",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconBorder: "border-violet-200",
    dot: "bg-violet-500",
    dotRing: "ring-violet-200",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    yearColor: "text-violet-700",
    yearBg: "bg-violet-50 border border-violet-200",
    accent: "from-violet-500 to-purple-600",
    tag: "Founded",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    year: "2014",
    event: "First Psychometric Career Test",
    icon: Star,
    description: "Introduced India's first advanced psychometric assessment tools to help students objectively discover their strengths, personality, and ideal career paths.",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconBorder: "border-blue-200",
    dot: "bg-blue-500",
    dotRing: "ring-blue-200",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    yearColor: "text-blue-700",
    yearBg: "bg-blue-50 border border-blue-200",
    accent: "from-blue-500 to-cyan-500",
    tag: "Milestone",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    year: "2017",
    event: "Reached 1 Million Students",
    icon: Users,
    description: "Our platform gained widespread trust and reached over 1 million students across India and beyond, making career guidance accessible to all.",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconBorder: "border-emerald-200",
    dot: "bg-emerald-500",
    dotRing: "ring-emerald-200",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    yearColor: "text-emerald-700",
    yearBg: "bg-emerald-50 border border-emerald-200",
    accent: "from-emerald-500 to-teal-500",
    tag: "Growth",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    year: "2020",
    event: "Counsellor Network Expanded Nationwide",
    icon: Trophy,
    description: "Built a certified professional network of expert counsellors across India to provide localised, culturally-aware, and personalised career support.",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconBorder: "border-amber-200",
    dot: "bg-amber-500",
    dotRing: "ring-amber-200",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    yearColor: "text-amber-700",
    yearBg: "bg-amber-50 border border-amber-200",
    accent: "from-amber-500 to-orange-500",
    tag: "Expansion",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    year: "2023",
    event: "Trusted by 5000+ Schools & Colleges",
    icon: CheckCircle,
    description: "Partnered with thousands of leading educational institutions nationwide, embedding EduPath's guidance system into the very fabric of education.",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    iconBorder: "border-rose-200",
    dot: "bg-rose-500",
    dotRing: "ring-rose-200",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    yearColor: "text-rose-700",
    yearBg: "bg-rose-50 border border-rose-200",
    accent: "from-rose-500 to-pink-500",
    tag: "Impact",
    tagColor: "bg-rose-100 text-rose-700",
  },
]

export default function Journey() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            A Decade of{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Transforming
            </span>{" "}
            Careers
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg">
            From a single office to a nationwide movement — here is our journey.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gradient line */}
          <div className="absolute left-8 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-400 via-emerald-400 to-rose-400 rounded-full opacity-30" />

          <div className="space-y-10">
            {timeline.map(({ year, event, icon: Icon, description, iconColor, iconBg, iconBorder, dot, dotRing, border, hoverBorder, yearBg, yearColor, accent, tag, tagColor }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="relative flex gap-8 group"
              >
                {/* Timeline dot + icon */}
                <div className="flex-none flex flex-col items-center" style={{ width: 64 }}>
                  <div className={`relative w-16 h-16 rounded-2xl ${iconBg} border ${iconBorder} flex items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform duration-300`}>
                    <div className={`absolute inset-0 rounded-2xl ring-4 ${dotRing} opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110`} />
                    <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.8} />
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 bg-white border-2 ${border} ${hoverBorder} rounded-3xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden relative`}>
                  {/* Top accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} rounded-t-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`text-sm font-black px-3 py-1 rounded-full ${yearBg} ${yearColor} tabular-nums`}>{year}</span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${tagColor}`}>{tag}</span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">{event}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{description}</p>

                  <div className={`mt-4 h-[2px] rounded-full bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* End CTA teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
            The journey continues <ArrowRight className="w-4 h-4" /> and your chapter starts here.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
