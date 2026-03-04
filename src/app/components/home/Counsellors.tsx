import { Star, MessageCircle, Award, Sparkles, ArrowRight } from "lucide-react"

const counsellors = [
  {
    name: "Surabhi Dewra",
    exp: "12 Years",
    specialization: "Career Planning & Counselling",
    rating: 4.9,
    students: "5,000+",
    gradient: "from-violet-500 to-purple-600",
    initials: "SD",
  },
  {
    name: "Adnan Buland",
    exp: "16 Years",
    specialization: "Higher Education & Abroad Studies",
    rating: 4.8,
    students: "8,000+",
    gradient: "from-blue-500 to-cyan-600",
    initials: "AB",
  },
  {
    name: "Pranav Bhatia",
    exp: "14 Years",
    specialization: "Engineering & Technology",
    rating: 4.9,
    students: "6,500+",
    gradient: "from-emerald-500 to-teal-600",
    initials: "PB",
  },
  {
    name: "Deepti Sharma",
    exp: "10 Years",
    specialization: "Medical & Life Sciences",
    rating: 4.7,
    students: "4,200+",
    gradient: "from-rose-500 to-pink-600",
    initials: "DS",
  },
]

export default function Counsellors() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-violet-50/60 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Our Experts
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Career Counsellors
            </span>
          </h2>
          
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {counsellors.map((c, i) => (
            <div
              key={i}
              className="group relative rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden p-6 flex flex-col items-center text-center"
            >
              {/* Top gradient strip */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${c.gradient}`} />

              {/* Avatar */}
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-4 mt-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {c.initials}
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-0.5">{c.name}</h3>
              <p className="text-xs text-slate-500 mb-3">{c.specialization}</p>

              {/* Rating row */}
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-semibold text-slate-700">{c.rating}</span>
                <span className="text-xs text-slate-400 ml-1">· {c.students} Students</span>
              </div>

              {/* Exp badge */}
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${c.gradient} text-white text-xs font-semibold mb-5`}
              >
                <Award className="w-3.5 h-3.5" />
                {c.exp} Experience
              </div>

              {/* CTA */}
              <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all duration-200">
                <MessageCircle className="w-4 h-4" />
                Book Session
              </button>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
            View All Counsellors
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
