import { Brain, Clock, HelpCircle, Users2, ArrowRight, Sparkles, CheckCircle2, BarChart3, Zap } from "lucide-react"

const tests = [
  {
    icon: Brain,
    tag: "Most Popular",
    name: "Psychometric Ideal Career Test™",
    details: "180 Questions",
    duration: "45 Minutes",
    target: "For All Age Groups",
    price: "₹2,000",
    discountedPrice: "₹1,000",
    features: ["Career Mapping", "Personality Analysis", "Detailed Report"],
    gradient: "from-violet-600 to-purple-600",
    bgGradient: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    tagBg: "bg-violet-600",
    btnClass: "border-2 border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  {
    icon: BarChart3,
    tag: "Class 10th",
    name: "Stream Selector™",
    details: "76 Questions",
    duration: "40 Minutes",
    target: "For Class 10th",
    price: "₹2,000",
    discountedPrice: "₹1,000",
    features: ["Stream Recommendations", "Aptitude Analysis", "Counsellor Review"],
    gradient: "from-blue-600 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50",
    border: "border-blue-200",
    tagBg: "bg-blue-600",
    btnClass: "border-2 border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  {
    icon: Zap,
    tag: "11th & 12th",
    name: "Engineering Selector",
    details: "100 Questions",
    duration: "60 Minutes",
    target: "11th & 12th Students",
    price: "₹2,000",
    discountedPrice: "₹1,000",
    features: ["Branch Guidance", "College Shortlisting", "Expert Insights"],
    gradient: "from-emerald-600 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    border: "border-emerald-200",
    tagBg: "bg-emerald-600",
    btnClass: "border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  },
]

export default function Assessments() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-violet-50/30 to-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-80 h-80 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Assessments
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Psychometric{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Assessments
            </span>
          </h2>
         
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((t, i) => {
            const Icon = t.icon
            return (
              <div
                key={i}
                className={`group relative rounded-3xl bg-gradient-to-br ${t.bgGradient} border ${t.border} p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col`}
              >
                {/* Tag */}
                <span
                  className={`absolute top-5 right-5 ${t.tagBg} text-white text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {t.tag}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">{t.name}</h3>

                {/* Meta info */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <HelpCircle className="w-4 h-4" />
                    {t.details}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {t.duration}
                  </div>
                </div>

                <span className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
                  <Users2 className="w-3.5 h-3.5" />
                  {t.target}
                </span>

                {/* Pricing */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-slate-400 text-sm line-through">{t.price}</span>
                  <span className="text-2xl font-bold text-slate-800">{t.discountedPrice}</span>
                  <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">50% OFF</span>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {t.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl ${t.btnClass} font-semibold hover:-translate-y-0.5 hover:shadow-md active:scale-[0.99] transition-all duration-200`}
                >
                  Take Test
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
