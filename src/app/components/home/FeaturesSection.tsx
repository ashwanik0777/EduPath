import { Brain, Target, BookOpen, Users, TrendingUp, Award, CheckCircle2, Sparkles } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze your responses to provide accurate career recommendations tailored to your unique profile.",
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-100",
  },
  {
    icon: Target,
    title: "Personalized Matching",
    description:
      "Get matched with careers and colleges that align with your interests, skills, and academic performance.",
    gradient: "from-rose-500 to-pink-600",
    bg: "from-rose-50 to-pink-50",
    border: "border-rose-100",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Database",
    description:
      "Access detailed information about 500+ colleges, courses, admission requirements, and career prospects.",
    gradient: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
    border: "border-emerald-100",
  },
  {
    icon: Users,
    title: "Expert Guidance",
    description:
      "Connect with experienced counselors and mentors who provide personalized advice for your educational journey.",
    gradient: "from-blue-500 to-cyan-600",
    bg: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your academic progress, set goals, and track your journey towards your dream career.",
    gradient: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-100",
  },
  {
    icon: Award,
    title: "Success Stories",
    description:
      "Learn from thousands of students who have successfully found their ideal career path through our platform.",
    gradient: "from-indigo-500 to-blue-600",
    bg: "from-indigo-50 to-blue-50",
    border: "border-indigo-100",
  },
]

const stats = [
  { value: "50,000+", label: "Students Guided" },
  { value: "500+", label: "Partner Colleges" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "200+", label: "Expert Counsellors" },
]

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Why EduPath?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-slate-500 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className={`group relative p-7 rounded-2xl bg-gradient-to-br ${feature.bg} border ${feature.border} hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CheckCircle2 className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
