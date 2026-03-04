import {
  Cpu,
  BarChart2,
  HeartPulse,
  Paintbrush2,
  FlaskConical,
  Scale,
  Landmark,
  Tv2,
  Shirt,
  Dumbbell,
  Sprout,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react"

const categories = [
  {
    name: "Engineering & Technology",
    icon: Cpu,
    gradient: "from-indigo-500 to-blue-600",
    bg: "from-indigo-50 to-blue-50",
    border: "border-indigo-100",
    text: "text-indigo-700",
  },
  {
    name: "Management & Marketing",
    icon: BarChart2,
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
    text: "text-violet-700",
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    gradient: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
    text: "text-rose-700",
  },
  {
    name: "Creativity & Art",
    icon: Paintbrush2,
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
    text: "text-amber-700",
  },
  {
    name: "Science & Research",
    icon: FlaskConical,
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
    text: "text-emerald-700",
  },
  {
    name: "Law & Order",
    icon: Scale,
    gradient: "from-slate-600 to-slate-700",
    bg: "from-slate-50 to-gray-100",
    border: "border-slate-200",
    text: "text-slate-700",
  },
  {
    name: "Commerce & Finance",
    icon: Landmark,
    gradient: "from-cyan-500 to-blue-500",
    bg: "from-cyan-50 to-blue-50",
    border: "border-cyan-100",
    text: "text-cyan-700",
  },
  {
    name: "Media & Communication",
    icon: Tv2,
    gradient: "from-fuchsia-500 to-pink-500",
    bg: "from-fuchsia-50 to-pink-50",
    border: "border-fuchsia-100",
    text: "text-fuchsia-700",
  },
  {
    name: "Fashion & Design",
    icon: Shirt,
    gradient: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-50",
    border: "border-pink-100",
    text: "text-pink-700",
  },
  {
    name: "Sports & Fitness",
    icon: Dumbbell,
    gradient: "from-orange-500 to-red-500",
    bg: "from-orange-50 to-red-50",
    border: "border-orange-100",
    text: "text-orange-700",
  },
  {
    name: "Agriculture & Environment",
    icon: Sprout,
    gradient: "from-lime-500 to-green-600",
    bg: "from-lime-50 to-green-50",
    border: "border-lime-100",
    text: "text-lime-700",
  },
  {
    name: "Education & Teaching",
    icon: BookOpen,
    gradient: "from-blue-500 to-indigo-600",
    bg: "from-blue-50 to-indigo-50",
    border: "border-blue-100",
    text: "text-blue-700",
  },
]

export default function Categories() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-50/60 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-violet-50/60 rounded-full -translate-x-1/3 translate-y-1/2 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Explore Fields
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Top Career{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-slate-500 text-lg">
            Explore diverse career fields and find the path that ignites your passion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className={`group relative flex flex-col items-center text-center p-5 rounded-2xl bg-gradient-to-br ${c.bg} border ${c.border} cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                aria-label={c.name}
              >
                {/* Subtle inner glow on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />

                {/* Icon box */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                </div>

                <span className={`text-sm font-semibold ${c.text} leading-snug`}>{c.name}</span>

                {/* Arrow appears on hover */}
                <span className={`mt-2 inline-flex items-center gap-0.5 text-xs font-medium ${c.text} opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200`}>
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
