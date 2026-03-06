"use client"
import { HelpCircle, Clock, Users, ArrowRight, Sparkles, Star } from "lucide-react"

const tests = [
  {
    name: "Ideal Career Test",
    q: 180,
    time: "45 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For All Age Groups",
    desc: "The most comprehensive assessment to find your ideal career across all domains.",
    tag: "Most Popular",
    tagColor: "bg-violet-100 text-violet-700",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    topBar: "from-violet-500 to-purple-600",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    btnClass: "border-2 border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
    featured: true,
  },
  {
    name: "Skill Based Test",
    q: 40,
    time: "30 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For Class 9th",
    desc: "Identify core skill areas and interests for Class 9 students planning their future.",
    tag: "Class 9th",
    tagColor: "bg-blue-100 text-blue-700",
    border: "border-blue-200",
    hoverBorder: "hover:border-blue-300",
    topBar: "from-blue-500 to-cyan-500",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    btnClass: "border-2 border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
    featured: false,
  },
  {
    name: "Stream Selector Test",
    q: 76,
    time: "40 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For Class 10th",
    desc: "Choose Science, Commerce, or Arts with confidence — backed by data, not guesswork.",
    tag: "Class 10th",
    tagColor: "bg-emerald-100 text-emerald-700",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    topBar: "from-emerald-500 to-teal-500",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    btnClass: "border-2 border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    featured: false,
  },
  {
    name: "Engineering Selector",
    q: 100,
    time: "60 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For 11th & 12th",
    desc: "Find the right engineering branch aligned with your aptitude and passion.",
    tag: "11th & 12th",
    tagColor: "bg-amber-100 text-amber-700",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    topBar: "from-amber-500 to-orange-500",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    btnClass: "border-2 border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100",
    featured: false,
  },
  {
    name: "Humanities Selector",
    q: 76,
    time: "60 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For 11th, 12th & B.A",
    desc: "Explore arts, law, social work, journalism and other humanities career paths.",
    tag: "Humanities",
    tagColor: "bg-rose-100 text-rose-700",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    topBar: "from-rose-500 to-pink-500",
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
    btnClass: "border-2 border-rose-300 bg-rose-50 text-rose-700 hover:bg-rose-100",
    featured: false,
  },
  {
    name: "Commerce Selector",
    q: 72,
    time: "60 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For 11th, 12th & B.Com",
    desc: "Discover the ideal commerce career — CA, MBA, banking, finance and more.",
    tag: "Commerce",
    tagColor: "bg-indigo-100 text-indigo-700",
    border: "border-indigo-200",
    hoverBorder: "hover:border-indigo-300",
    topBar: "from-indigo-500 to-blue-600",
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    btnClass: "border-2 border-indigo-300 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    featured: false,
  },
  {
    name: "Professional Skill Index",
    q: 80,
    time: "60 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "Grads & Working Professionals",
    desc: "Assess your professional skills, leadership potential and ideal work environment.",
    tag: "Professional",
    tagColor: "bg-teal-100 text-teal-700",
    border: "border-teal-200",
    hoverBorder: "hover:border-teal-300",
    topBar: "from-teal-500 to-cyan-500",
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
    btnClass: "border-2 border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100",
    featured: false,
  },
  {
    name: "Educator Professional Skills",
    q: 63,
    time: "60 Min",
    price: "₹2000",
    offer: "₹1000",
    audience: "For Educators",
    desc: "Designed specifically for teachers to understand their teaching style and growth areas.",
    tag: "Educators",
    tagColor: "bg-fuchsia-100 text-fuchsia-700",
    border: "border-fuchsia-200",
    hoverBorder: "hover:border-fuchsia-300",
    topBar: "from-fuchsia-500 to-pink-500",
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-50",
    btnClass: "border-2 border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700 hover:bg-fuchsia-100",
    featured: false,
  },
]

export default function AssessmentsList() {
  return (
    <section id="assessments" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            8 Assessments Available
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Test
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Each assessment is tailored to a specific stage of your education or career journey — choose the one that fits you best.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tests.map((test, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${test.border} ${test.hoverBorder} p-6 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden`}
            >
              {/* Top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${test.topBar} rounded-t-3xl`} />

              {/* Featured star */}
              {test.featured && (
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    Popular
                  </div>
                </div>
              )}

              {/* Tag & audience */}
              <span className={`self-start text-xs font-bold px-2.5 py-1 rounded-full ${test.tagColor} mt-2 mb-4`}>
                {test.tag}
              </span>

              <h3 className="text-base font-black text-slate-900 mb-2 leading-snug">{test.name}</h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-5 flex-1">{test.desc}</p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${test.iconBg} ${test.iconColor}`}>
                  <HelpCircle className="w-3.5 h-3.5" />
                  {test.q} Qs
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${test.iconBg} ${test.iconColor}`}>
                  <Clock className="w-3.5 h-3.5" />
                  {test.time}
                </span>
                <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${test.iconBg} ${test.iconColor}`}>
                  <Users className="w-3.5 h-3.5" />
                  {test.audience}
                </span>
              </div>

              {/* Price row */}
              <div className="flex items-center gap-2 mb-4">
                <span className="line-through text-slate-400 text-sm">{test.price}</span>
                <span className="text-lg font-black text-slate-900">{test.offer}</span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">50% OFF</span>
              </div>

              <a
                href="/buy"
                className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-semibold text-sm ${test.btnClass} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}
              >
                Take Test
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
