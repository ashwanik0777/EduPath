"use client"

import { useEffect, useMemo, useState } from "react"
import {
  Code,
  Facebook,
  Github,
  Globe,
  Globe2,
  Instagram,
  Linkedin,
  Mail,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react"

type DeveloperRoleType = "Lead" | "Member" | "Thread" | "Advisor" | "Contributor"

type TechTitan = {
  _id: string
  name: string
  role: string
  roleType?: DeveloperRoleType
  specialization: string
  bio: string
  imageUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  website?: string
  twitter?: string
  instagram?: string
  facebook?: string
  email?: string
  yearsOfExperience?: number
  rollNumber?: string
  batch?: string
  program?: string
  school?: string
  department?: string
  responsibilities?: string[] | string
  technologies?: string[] | string
  contributions?: string[] | string
}

const roleColorMap: Record<DeveloperRoleType, string> = {
  Lead: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Member: "bg-sky-50 text-sky-700 border-sky-200",
  Thread: "bg-violet-50 text-violet-700 border-violet-200",
  Advisor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Contributor: "bg-amber-50 text-amber-700 border-amber-200",
}

const parseList = (value: string[] | string | undefined): string[] => {
  if (!value) return []
  if (Array.isArray(value)) return value.filter(Boolean)

  try {
    const parsed = JSON.parse(value)
    if (Array.isArray(parsed)) return parsed.filter(Boolean)
  } catch {
  }

  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function TechTitansPage() {
  const [members, setMembers] = useState<TechTitan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMembers = async () => {
      try {
        const response = await fetch("/api/tech-titans", { cache: "no-store" })
        const data = await response.json()
        if (data?.success && Array.isArray(data?.data)) {
          setMembers(data.data)
        }
      } catch {
        setMembers([])
      } finally {
        setLoading(false)
      }
    }

    loadMembers()
  }, [])

  const stats = useMemo(() => {
    const total = members.length
    const leaders = members.filter((member) => member.roleType === "Lead").length
    const avgExperience =
      total > 0
        ? Math.round(
            members.reduce((sum, member) => sum + Number(member.yearsOfExperience || 0), 0) /
              total,
          )
        : 0

    return { total, leaders, avgExperience }
  }, [members])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/60 to-cyan-50/70 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 -left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-16 -right-8 w-80 h-80 bg-cyan-300/20 rounded-full blur-3xl" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-3xl mb-6 shadow-xl shadow-indigo-300/40">
            <Code className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 via-indigo-700 to-cyan-700 mb-5 tracking-tight">
            Tech Titans
          </h1>
          <p className="text-lg md:text-xl text-slate-700 max-w-3xl mx-auto mb-2 font-medium">
            Meet the engineers, builders, and contributors shaping EduPath every day.
          </p>
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-600" />
            Database-driven profiles for production-ready team showcase
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-indigo-200/30 p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-6">
              <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-indigo-700">{stats.total}</p>
              <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold">Team Members</p>
            </div>

            <div className="text-center rounded-2xl border border-cyan-100 bg-cyan-50/60 px-4 py-6">
              <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-700 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-cyan-700">{stats.leaders}</p>
              <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold">Team Leads</p>
            </div>

            <div className="text-center rounded-2xl border border-emerald-100 bg-emerald-50/60 px-4 py-6">
              <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
                <Code className="w-6 h-6" />
              </div>
              <p className="text-3xl font-extrabold text-emerald-700">{stats.avgExperience}+</p>
              <p className="text-xs uppercase tracking-wider text-slate-600 font-semibold">Avg. Experience</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-10 text-center text-slate-600 shadow-sm">
            Loading Tech Titans from database...
          </div>
        ) : members.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 p-10 text-center text-slate-600 shadow-sm">
            No team members found in database. Add records from admin or seed script and refresh.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {members.map((member) => {
              const responsibilities = parseList(member.responsibilities)
              const technologies = parseList(member.technologies)
              const contributions = parseList(member.contributions)
              const roleType = member.roleType || "Member"

              return (
                <article
                  key={member._id}
                  className="group bg-white/75 backdrop-blur-xl rounded-3xl border border-white/70 shadow-xl shadow-indigo-200/20 p-6 hover:shadow-2xl hover:shadow-indigo-200/40 transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-br from-indigo-200 via-cyan-200 to-sky-200 mb-5">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src={member.imageUrl || "/EdupathLogo.png"}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h2 className="text-xl font-bold text-slate-900">{member.name}</h2>
                    <p className="text-sm text-indigo-700 font-semibold">{member.role}</p>
                    <span
                      className={`inline-flex mt-2 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${roleColorMap[roleType]}`}
                    >
                      {roleType}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-5">
                    <p className="text-slate-700">
                      <span className="font-semibold text-slate-900">Specialization:</span> {member.specialization}
                    </p>
                    {member.yearsOfExperience ? (
                      <p className="text-slate-700">
                        <span className="font-semibold text-slate-900">Experience:</span> {member.yearsOfExperience}+ years
                      </p>
                    ) : null}
                    {member.bio ? <p className="text-slate-600 leading-relaxed">{member.bio}</p> : null}
                  </div>

                  {(member.school || member.department || member.program || member.batch || member.rollNumber) && (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-700 space-y-1.5 mb-4">
                      {member.school ? <div><span className="text-slate-500">School:</span> <span className="font-semibold">{member.school}</span></div> : null}
                      {member.department ? <div><span className="text-slate-500">Department:</span> <span className="font-semibold">{member.department}</span></div> : null}
                      {member.program ? <div><span className="text-slate-500">Program:</span> <span className="font-semibold">{member.program}</span></div> : null}
                      {member.batch ? <div><span className="text-slate-500">Batch:</span> <span className="font-semibold">{member.batch}</span></div> : null}
                      {member.rollNumber ? <div><span className="text-slate-500">Roll No:</span> <span className="font-semibold">{member.rollNumber}</span></div> : null}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-200">
                    {member.email ? (
                      <a href={`mailto:${member.email}`} className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-rose-100 text-slate-700 hover:text-rose-700 flex items-center justify-center transition-colors" title="Email">
                        <Mail className="w-4 h-4" />
                      </a>
                    ) : null}
                    {member.githubUrl ? (
                      <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors" title="GitHub">
                        <Github className="w-4 h-4" />
                      </a>
                    ) : null}
                    {member.linkedinUrl ? (
                      <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors" title="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : null}
                    {(member.website || member.portfolioUrl) ? (
                      <a href={member.website || member.portfolioUrl} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 flex items-center justify-center transition-colors" title="Website">
                        <Globe className="w-4 h-4" />
                      </a>
                    ) : null}
                    {member.twitter ? (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 flex items-center justify-center transition-colors" title="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                    ) : null}
                    {member.instagram ? (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-pink-100 text-slate-700 hover:text-pink-700 flex items-center justify-center transition-colors" title="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                    ) : null}
                    {member.facebook ? (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 flex items-center justify-center transition-colors" title="Facebook">
                        <Facebook className="w-4 h-4" />
                      </a>
                    ) : null}
                  </div>

                  {(responsibilities.length > 0 || technologies.length > 0 || contributions.length > 0) && (
                    <div className="mt-5 space-y-3 text-xs">
                      {responsibilities.length > 0 ? (
                        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
                          <p className="font-semibold text-indigo-700 mb-1.5">Responsibilities</p>
                          <ul className="space-y-1 text-slate-700 list-disc ml-4">
                            {responsibilities.map((item, index) => (
                              <li key={`${member._id}-resp-${index}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {technologies.length > 0 ? (
                        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                          <p className="font-semibold text-emerald-700 mb-2">Technologies</p>
                          <div className="flex flex-wrap gap-1.5">
                            {technologies.map((item, index) => (
                              <span key={`${member._id}-tech-${index}`} className="rounded-md border border-emerald-200 bg-white px-2 py-1 text-[11px] font-medium text-emerald-700">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {contributions.length > 0 ? (
                        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-3">
                          <p className="font-semibold text-violet-700 mb-1.5">Key Contributions</p>
                          <ul className="space-y-1 text-slate-700 list-disc ml-4">
                            {contributions.map((item, index) => (
                              <li key={`${member._id}-contrib-${index}`}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
