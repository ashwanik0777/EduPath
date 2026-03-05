"use client"
import { User, Linkedin, Mail, Sparkles, Quote } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  img?: string
  email?: string
  linkedin?: string
  quote?: string
  avatarGradient: string
  avatarBorder: string
  roleBg: string
  roleColor: string
  cardBorder: string
  cardHover: string
  topBar: string
}

const team: TeamMember[] = [
  {
    name: "Name 1",
    role: "Founder & CEO",
    quote: "Empowering every student begins with believing in their potential.",
    avatarGradient: "from-violet-500 to-purple-600",
    avatarBorder: "border-violet-200",
    roleBg: "bg-violet-50",
    roleColor: "text-violet-700",
    cardBorder: "border-violet-100",
    cardHover: "hover:border-violet-300",
    topBar: "from-violet-500 to-purple-600",
  },
  {
    name: "Name 2",
    role: "Sr. Career Counsellor",
    quote: "The right career path is not found; it is built, step by step.",
    avatarGradient: "from-blue-500 to-cyan-600",
    avatarBorder: "border-blue-200",
    roleBg: "bg-blue-50",
    roleColor: "text-blue-700",
    cardBorder: "border-blue-100",
    cardHover: "hover:border-blue-300",
    topBar: "from-blue-500 to-cyan-500",
  },
  {
    name: "Name 3",
    role: "Career Mentor",
    quote: "Clarity today builds the confidence for tomorrow's decisions.",
    avatarGradient: "from-emerald-500 to-teal-600",
    avatarBorder: "border-emerald-200",
    roleBg: "bg-emerald-50",
    roleColor: "text-emerald-700",
    cardBorder: "border-emerald-100",
    cardHover: "hover:border-emerald-300",
    topBar: "from-emerald-500 to-teal-500",
  },
  {
    name: "Name 4",
    role: "Counsellor & Trainer",
    quote: "Guiding students through uncertainty is the most rewarding work I know.",
    avatarGradient: "from-rose-500 to-pink-600",
    avatarBorder: "border-rose-200",
    roleBg: "bg-rose-50",
    roleColor: "text-rose-700",
    cardBorder: "border-rose-100",
    cardHover: "hover:border-rose-300",
    topBar: "from-rose-500 to-pink-500",
  },
]

export default function TeamSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            The People Behind EduPath
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-rose-600 to-violet-600 bg-clip-text text-transparent">
              Expert Team
            </span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
            Dedicated professionals who have helped thousands of students find their perfect career path.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div
              key={i}
              className={`group relative bg-white rounded-3xl border-2 ${member.cardBorder} ${member.cardHover} p-7 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center overflow-hidden`}
            >
              {/* Top accent */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${member.topBar} rounded-t-3xl`} />

              {/* Avatar */}
              <div className="relative mb-5 mt-3">
                {member.img ? (
                  <img
                    src={member.img}
                    alt={member.name}
                    className={`w-24 h-24 rounded-2xl object-cover border-2 ${member.avatarBorder} shadow-lg`}
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${member.avatarGradient} border-2 ${member.avatarBorder} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    <User className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />
              </div>

              {/* Name & Role */}
              <h3 className="text-lg font-black text-slate-900 mb-1.5">{member.name}</h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${member.roleBg} ${member.roleColor} mb-4`}>
                {member.role}
              </span>

              {/* Quote */}
              {member.quote && (
                <div className="relative mb-5 px-1">
                  <Quote className="w-4 h-4 text-slate-200 absolute -top-1 -left-1" />
                  <p className="text-slate-400 text-xs leading-relaxed italic pl-3">{member.quote}</p>
                </div>
              )}

              {/* Social icons */}
              <div className="flex gap-3 mt-auto">
                <a
                  href={`mailto:${member.email || ""}`}
                  aria-label={`Email ${member.name}`}
                  className={`w-9 h-9 rounded-xl ${member.roleBg} border ${member.cardBorder} flex items-center justify-center ${member.roleColor} hover:scale-110 transition-transform duration-200`}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={member.linkedin || "#"}
                  aria-label={`${member.name} LinkedIn`}
                  className={`w-9 h-9 rounded-xl ${member.roleBg} border ${member.cardBorder} flex items-center justify-center ${member.roleColor} hover:scale-110 transition-transform duration-200`}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
