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
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50",
    border: "border-indigo-200",
    hoverBg: "hover:bg-indigo-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-indigo-700",
    arrowColor: "text-indigo-500",
  },
  {
    name: "Management & Marketing",
    icon: BarChart2,
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    border: "border-violet-200",
    hoverBg: "hover:bg-violet-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-violet-700",
    arrowColor: "text-violet-500",
  },
  {
    name: "Healthcare",
    icon: HeartPulse,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
    border: "border-rose-200",
    hoverBg: "hover:bg-rose-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-rose-600",
    arrowColor: "text-rose-500",
  },
  {
    name: "Creativity & Art",
    icon: Paintbrush2,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    border: "border-amber-200",
    hoverBg: "hover:bg-amber-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-amber-700",
    arrowColor: "text-amber-500",
  },
  {
    name: "Science & Research",
    icon: FlaskConical,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    border: "border-emerald-200",
    hoverBg: "hover:bg-emerald-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-emerald-700",
    arrowColor: "text-emerald-500",
  },
  {
    name: "Law & Order",
    icon: Scale,
    iconColor: "text-slate-600",
    iconBg: "bg-slate-100",
    border: "border-slate-300",
    hoverBg: "hover:bg-slate-50/80",
    text: "text-slate-700",
    hoverText: "group-hover:text-slate-800",
    arrowColor: "text-slate-500",
  },
  {
    name: "Commerce & Finance",
    icon: Landmark,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
    border: "border-cyan-200",
    hoverBg: "hover:bg-cyan-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-cyan-700",
    arrowColor: "text-cyan-500",
  },
  {
    name: "Media & Communication",
    icon: Tv2,
    iconColor: "text-fuchsia-600",
    iconBg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    hoverBg: "hover:bg-fuchsia-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-fuchsia-700",
    arrowColor: "text-fuchsia-500",
  },
  {
    name: "Fashion & Design",
    icon: Shirt,
    iconColor: "text-pink-500",
    iconBg: "bg-pink-50",
    border: "border-pink-200",
    hoverBg: "hover:bg-pink-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-pink-700",
    arrowColor: "text-pink-500",
  },
  {
    name: "Sports & Fitness",
    icon: Dumbbell,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    border: "border-orange-200",
    hoverBg: "hover:bg-orange-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-orange-700",
    arrowColor: "text-orange-500",
  },
  {
    name: "Agriculture & Environment",
    icon: Sprout,
    iconColor: "text-lime-600",
    iconBg: "bg-lime-50",
    border: "border-lime-200",
    hoverBg: "hover:bg-lime-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-lime-700",
    arrowColor: "text-lime-600",
  },
  {
    name: "Education & Teaching",
    icon: BookOpen,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    border: "border-blue-200",
    hoverBg: "hover:bg-blue-50/60",
    text: "text-slate-700",
    hoverText: "group-hover:text-blue-700",
    arrowColor: "text-blue-500",
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
         
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className={`group relative flex flex-col items-center text-center p-5 rounded-2xl bg-white border-2 ${c.border} cursor-pointer ${c.hoverBg} hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300`}
                aria-label={c.name}
              >
                {/* Icon — colored, light bg pill */}
                <div
                  className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-7 h-7 ${c.iconColor}`} strokeWidth={1.8} />
                </div>

                <span className={`text-sm font-semibold ${c.text} ${c.hoverText} leading-snug transition-colors duration-200`}>
                  {c.name}
                </span>

                {/* Arrow appears on hover */}
                <span className={`mt-2 inline-flex items-center gap-0.5 text-xs font-medium ${c.arrowColor} opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200`}>
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
