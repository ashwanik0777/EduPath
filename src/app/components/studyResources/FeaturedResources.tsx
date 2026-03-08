"use client"
import { BookOpen, Clock, Star, Users, Sparkles, ArrowRight } from "lucide-react"

const resources = [
  {
    title: "Full Stack Development",
    provider: "Coursera",
    duration: "6 Months",
    rating: "4.8",
    desc: "Master HTML, CSS, React, Node.js and deploy production-ready web apps.",
    tag: "Tech",
    border: "border-violet-200", hoverBorder: "hover:border-violet-300",
    accent: "from-violet-500 to-violet-600",
    tagClass: "bg-violet-100 text-violet-700",
    iconColor: "text-violet-600", btnClass: "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
    popular: true,
  },
  {
    title: "AI & Machine Learning",
    provider: "Udemy",
    duration: "4 Months",
    rating: "4.7",
    desc: "Learn Python, ML algorithms, neural networks and real-world AI projects.",
    tag: "Trending",
    border: "border-blue-200", hoverBorder: "hover:border-blue-300",
    accent: "from-blue-500 to-blue-600",
    tagClass: "bg-blue-100 text-blue-700",
    iconColor: "text-blue-600", btnClass: "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
    popular: false,
  },
  {
    title: "UPSC General Studies",
    provider: "BYJU's",
    duration: "1 Year",
    rating: "4.9",
    desc: "Comprehensive GS coverage — History, Polity, Geography, Economy & Current Affairs.",
    tag: "Govt. Exam",
    border: "border-emerald-200", hoverBorder: "hover:border-emerald-300",
    accent: "from-emerald-500 to-emerald-600",
    tagClass: "bg-emerald-100 text-emerald-700",
    iconColor: "text-emerald-600", btnClass: "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    popular: true,
  },
  {
    title: "Bank PO Prep",
    provider: "Adda247",
    duration: "8 Months",
    rating: "4.6",
    desc: "Quantitative aptitude, Reasoning, English & GA for IBPS, SBI & RBI exams.",
    tag: "Banking",
    border: "border-amber-200", hoverBorder: "hover:border-amber-300",
    accent: "from-amber-500 to-amber-600",
    tagClass: "bg-amber-100 text-amber-700",
    iconColor: "text-amber-600", btnClass: "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100",
    popular: false,
  },
  {
    title: "Spoken English Mastery",
    provider: "Duolingo",
    duration: "Ongoing",
    rating: "4.8",
    desc: "Build fluency, vocabulary and confidence in English for career & everyday use.",
    tag: "Language",
    border: "border-rose-200", hoverBorder: "hover:border-rose-300",
    accent: "from-rose-500 to-rose-600",
    tagClass: "bg-rose-100 text-rose-700",
    iconColor: "text-rose-600", btnClass: "border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100",
    popular: false,
  },
]

export default function FeaturedResources() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14 space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Handpicked For You
          </span>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-700 via-violet-600 to-indigo-700 bg-clip-text text-transparent">
            Featured Learning Resources
          </h2>
         
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map(({ title, provider, duration, rating, desc, tag, border, hoverBorder, accent, tagClass, iconColor, btnClass, popular }, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${border} ${hoverBorder} hover:-translate-y-1 hover:shadow-xl transition-all duration-300 p-6 flex flex-col gap-4 overflow-hidden`}
            >
              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${accent} rounded-t-3xl`} />
              <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Header row */}
              <div className="flex items-start justify-between pt-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagClass}`}>{tag}</span>
                {popular && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> Popular
                  </span>
                )}
              </div>

              {/* Title + desc */}
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-slate-800 leading-snug">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>

              {/* Meta */}
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Users className={`w-4 h-4 ${iconColor}`} />
                  <span><span className="font-semibold text-slate-700">Provider:</span> {provider}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${iconColor}`} />
                  <span><span className="font-semibold text-slate-700">Duration:</span> {duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-3.5 h-3.5 ${si < Math.round(parseFloat(rating)) ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
                    />
                  ))}
                  <span className="text-xs font-semibold text-slate-500 ml-1">{rating}/5</span>
                </div>
              </div>

              {/* CTA */}
              <a
                href="#"
                className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold border-2 ${btnClass} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
              >
                <BookOpen className="w-4 h-4" />
                Learn More
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
