"use client"

import { useState } from "react"
import { Trash2, Pencil, Plus, X, Search, Github, Linkedin, Globe, Twitter, Instagram, Facebook, Mail } from "lucide-react"
import Image from "next/image"

type Item = {
  _id: string
  name?: string
  role?: string
  roleType?: string
  specialization?: string
  bio?: string
  image?: string
  imageUrl?: string
  email?: string
  github?: string
  githubUrl?: string
  linkedin?: string
  linkedinUrl?: string
  website?: string
  portfolioUrl?: string
  twitter?: string
  instagram?: string
  facebook?: string
  rollNumber?: string
  batch?: string
  program?: string
  school?: string
  department?: string
  yearsOfExperience?: number | string
  responsibilities?: string[] | string
  technologies?: string[] | string
  contributions?: string[] | string
  isActive?: boolean
}

type TechTitansTabProps = {
  techTitans: Item[]
  techTitansSearch: string
  setTechTitansSearch: React.Dispatch<React.SetStateAction<string>>
  loadTechTitans: (query?: string) => Promise<void>
  createTechTitan: (payload: Record<string, unknown>) => Promise<void>
  updateTechTitan: (id: string, payload: Record<string, unknown>) => Promise<void>
  deleteTechTitan: (id: string) => Promise<void>
  askConfirmation: (config: {
    title: string
    description: string
    confirmLabel: string
    confirmVariant?: "default" | "destructive"
    action: () => Promise<void>
  }) => void
}

const EMPTY_FORM = {
  name: "",
  role: "",
  roleType: "Member",
  specialization: "",
  bio: "",
  image: "",
  email: "",
  github: "",
  linkedin: "",
  website: "",
  twitter: "",
  instagram: "",
  facebook: "",
  rollNumber: "",
  batch: "",
  program: "",
  school: "",
  department: "",
  yearsOfExperience: "",
  responsibilities: "",
  technologies: "",
  contributions: "",
  isActive: true,
}

type FormState = typeof EMPTY_FORM

function Field({
  label, fieldKey, form, setForm, placeholder, type,
}: {
  label: string; fieldKey: keyof FormState; form: FormState
  setForm: (v: Partial<FormState>) => void; placeholder?: string; type?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <input
        type={type ?? "text"}
        placeholder={placeholder ?? label}
        value={form[fieldKey] as string}
        onChange={e => setForm({ [fieldKey]: e.target.value })}
        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  )
}

function TextArea({
  label, fieldKey, form, setForm, rows, placeholder,
}: {
  label: string; fieldKey: keyof FormState; form: FormState
  setForm: (v: Partial<FormState>) => void; rows?: number; placeholder?: string
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      <textarea
        rows={rows ?? 3}
        placeholder={placeholder ?? label}
        value={form[fieldKey] as string}
        onChange={e => setForm({ [fieldKey]: e.target.value })}
        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 resize-none"
      />
    </div>
  )
}

export function TechTitansTab({
  techTitans,
  techTitansSearch,
  setTechTitansSearch,
  loadTechTitans,
  createTechTitan,
  updateTechTitan,
  deleteTechTitan,
  askConfirmation,
}: TechTitansTabProps) {
  const [view, setView] = useState<"list" | "form">("list")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setFormRaw] = useState<FormState>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)

  const setForm = (patch: Partial<FormState>) => setFormRaw(prev => ({ ...prev, ...patch }))

  const openAdd = () => {
    setEditingId(null)
    setFormRaw(EMPTY_FORM)
    setView("form")
  }

  const openEdit = (item: Item) => {
    const str = (v: unknown) => (v == null ? "" : String(v))
    const arr = (v: unknown) =>
      Array.isArray(v) ? (v as string[]).join(" | ") : str(v)
    setFormRaw({
      name: str(item.name),
      role: str(item.role),
      roleType: str(item.roleType || "Member"),
      specialization: str(item.specialization),
      bio: str(item.bio),
      image: str(item.image || item.imageUrl),
      email: str(item.email),
      github: str(item.github || item.githubUrl),
      linkedin: str(item.linkedin || item.linkedinUrl),
      website: str(item.website || item.portfolioUrl),
      twitter: str(item.twitter),
      instagram: str(item.instagram),
      facebook: str(item.facebook),
      rollNumber: str(item.rollNumber),
      batch: str(item.batch),
      program: str(item.program),
      school: str(item.school),
      department: str(item.department),
      yearsOfExperience: str(item.yearsOfExperience),
      responsibilities: arr(item.responsibilities),
      technologies: arr(item.technologies),
      contributions: arr(item.contributions),
      isActive: item.isActive !== false,
    })
    setEditingId(item._id)
    setView("form")
  }

  const handleSubmit = async () => {
    setSaving(true)
    try {
      const payload: Record<string, unknown> = {
        name: form.name,
        role: form.role,
        roleType: form.roleType,
        specialization: form.specialization,
        bio: form.bio,
        image: form.image,
        imageUrl: form.image,
        email: form.email,
        github: form.github,
        githubUrl: form.github,
        linkedin: form.linkedin,
        linkedinUrl: form.linkedin,
        website: form.website,
        portfolioUrl: form.website,
        twitter: form.twitter,
        instagram: form.instagram,
        facebook: form.facebook,
        rollNumber: form.rollNumber,
        batch: form.batch,
        program: form.program,
        school: form.school,
        department: form.department,
        yearsOfExperience: form.yearsOfExperience ? Number(form.yearsOfExperience) : undefined,
        responsibilities: form.responsibilities,
        technologies: form.technologies,
        contributions: form.contributions,
        isActive: form.isActive,
      }
      if (editingId) {
        await updateTechTitan(editingId, payload)
      } else {
        await createTechTitan(payload)
      }
      setView("list")
      setEditingId(null)
      setFormRaw(EMPTY_FORM)
    } finally {
      setSaving(false)
    }
  }

  const imgSrc = (item: Item) =>
    (item.image as string) || (item.imageUrl as string) || ""

  const chips = (arr: unknown): string[] => {
    if (!arr) return []
    if (Array.isArray(arr)) return arr as string[]
    return (arr as string).split("|").map(s => s.trim()).filter(Boolean)
  }

  const roleColors: Record<string, string> = {
    Lead: "bg-yellow-500/20 text-yellow-800 border border-yellow-500/40",
    Member: "bg-blue-500/20 text-blue-300 border border-blue-500/40",
    Thread: "bg-purple-500/20 text-purple-300 border border-purple-500/40",
    Advisor: "bg-green-500/20 text-green-300 border border-green-500/40",
    Contributor: "bg-pink-500/20 text-pink-300 border border-pink-500/40",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tech Titans</h2>
          <p className="text-slate-600 text-sm mt-0.5">Manage developer team profiles</p>
        </div>
        <button
          onClick={view === "list" ? openAdd : () => { setView("list"); setEditingId(null); setFormRaw(EMPTY_FORM) }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shadow-sm"
        >
          {view === "list" ? <><Plus size={15} /> Add Member</> : <><X size={15} /> Cancel</>}
        </button>
      </div>

      {/* FORM VIEW */}
      {view === "form" && (
        <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
            {editingId ? "Edit Member" : "Add New Member"}
          </h3>

          {/* Basic Info */}
          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Basic Info</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Full Name" fieldKey="name" form={form} setForm={setForm} />
              <Field label="Role / Title" fieldKey="role" form={form} setForm={setForm} placeholder="e.g. Full Stack Developer" />
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Role Type</label>
                <select
                  value={form.roleType}
                  onChange={e => setForm({ roleType: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  {["Lead", "Member", "Thread", "Advisor", "Contributor"].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <Field label="Specialization" fieldKey="specialization" form={form} setForm={setForm} />
              <Field label="Profile Image URL" fieldKey="image" form={form} setForm={setForm} placeholder="https://..." />
              <div className="flex items-center gap-3 mt-5">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={e => setForm({ isActive: e.target.checked })}
                  id="isActive"
                  className="w-4 h-4 accent-blue-500"
                />
                <label htmlFor="isActive" className="text-sm text-slate-700 font-medium">Active (visible publicly)</label>
              </div>
            </div>
            <div className="mt-4">
              <TextArea label="Bio" fieldKey="bio" form={form} setForm={setForm} rows={3} placeholder="Short bio or tagline..." />
            </div>
          </section>

          {/* Contact & Social */}
          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Contact & Social Links</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Email" fieldKey="email" form={form} setForm={setForm} type="email" placeholder="email@example.com" />
              <Field label="GitHub URL" fieldKey="github" form={form} setForm={setForm} placeholder="https://github.com/..." />
              <Field label="LinkedIn URL" fieldKey="linkedin" form={form} setForm={setForm} placeholder="https://linkedin.com/in/..." />
              <Field label="Website / Portfolio" fieldKey="website" form={form} setForm={setForm} placeholder="https://..." />
              <Field label="Twitter URL" fieldKey="twitter" form={form} setForm={setForm} placeholder="https://twitter.com/..." />
              <Field label="Instagram URL" fieldKey="instagram" form={form} setForm={setForm} placeholder="https://instagram.com/..." />
              <Field label="Facebook URL" fieldKey="facebook" form={form} setForm={setForm} placeholder="https://facebook.com/..." />
            </div>
          </section>

          {/* Academic Info */}
          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-3 font-semibold">Academic Info</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Roll Number" fieldKey="rollNumber" form={form} setForm={setForm} />
              <Field label="Batch" fieldKey="batch" form={form} setForm={setForm} placeholder="e.g. 2023-27" />
              <Field label="Program" fieldKey="program" form={form} setForm={setForm} placeholder="e.g. B-Tech CSE" />
              <Field label="School / Faculty" fieldKey="school" form={form} setForm={setForm} placeholder="e.g. SOICT" />
              <Field label="Department" fieldKey="department" form={form} setForm={setForm} placeholder="e.g. CSE" />
              <Field label="Years of Experience" fieldKey="yearsOfExperience" form={form} setForm={setForm} type="number" placeholder="0" />
            </div>
          </section>

          {/* Detail Lists */}
          <section>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-1 font-semibold">Detail Lists</p>
            <p className="text-xs text-slate-500 mb-3">Separate multiple items with <span className="font-mono text-slate-300"> | </span></p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextArea label="Responsibilities" fieldKey="responsibilities" form={form} setForm={setForm} rows={4} placeholder="Manage frontend | Build APIs | Write docs" />
              <TextArea label="Technologies" fieldKey="technologies" form={form} setForm={setForm} rows={4} placeholder="React | Node.js | MongoDB" />
              <TextArea label="Contributions" fieldKey="contributions" form={form} setForm={setForm} rows={4} placeholder="Built XYZ feature | Fixed critical bug" />
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => { setView("list"); setEditingId(null); setFormRaw(EMPTY_FORM) }}
              className="px-5 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || !form.name.trim()}
              className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold transition-colors"
            >
              {saving ? "Saving..." : editingId ? "Update Member" : "Add Member"}
            </button>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name, role, school..."
              value={techTitansSearch}
              onChange={e => {
                setTechTitansSearch(e.target.value)
                loadTechTitans(e.target.value)
              }}
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {techTitans.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-semibold">No members yet</p>
              <p className="text-sm mt-1">Click &quot;Add Member&quot; to create the first Tech Titan profile.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {techTitans.map(item => {
                const src = imgSrc(item)
                const techList = chips(item.technologies)
                const roleType = item.roleType || "Member"
                const memberName = item.name || "Unknown"
                const memberRole = item.role || "-"
                const meta = [item.batch, item.program, item.department].filter((part): part is string => Boolean(part && String(part).trim()))
                const githubLink = item.github || item.githubUrl || ""
                const linkedinLink = item.linkedin || item.linkedinUrl || ""
                const websiteLink = item.website || item.portfolioUrl || ""
                return (
                  <div
                    key={item._id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-md transition-all"
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        {src ? (
                          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
                            <Image src={src} alt={memberName} fill className="object-cover" unoptimized />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center text-white text-xl font-bold border border-slate-200">
                            {memberName?.[0]?.toUpperCase() ?? "?"}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-bold text-slate-900 truncate">{memberName}</p>
                            <p className="text-slate-500 text-xs truncate">{memberRole}</p>
                          </div>
                          <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-semibold ${roleColors[roleType] ?? roleColors.Member}`}>
                            {roleType}
                          </span>
                        </div>

                        {meta.length > 0 && (
                          <p className="text-xs text-slate-500 mt-1 truncate">
                            {meta.join(" · ")}
                          </p>
                        )}

                        {techList.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {techList.slice(0, 5).map(t => (
                              <span key={t} className="text-[10px] bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full">
                                {t}
                              </span>
                            ))}
                            {techList.length > 5 && (
                              <span className="text-[10px] text-slate-500">+{techList.length - 5} more</span>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 mt-3 flex-wrap">
                          {item.email && <a href={`mailto:${item.email}`} className="text-slate-500 hover:text-blue-500 transition-colors"><Mail size={14} /></a>}
                          {githubLink && <a href={githubLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900 transition-colors"><Github size={14} /></a>}
                          {linkedinLink && <a href={linkedinLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors"><Linkedin size={14} /></a>}
                          {websiteLink && <a href={websiteLink} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-emerald-600 transition-colors"><Globe size={14} /></a>}
                          {item.twitter && <a href={item.twitter} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-sky-500 transition-colors"><Twitter size={14} /></a>}
                          {item.instagram && <a href={item.instagram} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-pink-500 transition-colors"><Instagram size={14} /></a>}
                          {item.facebook && <a href={item.facebook} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-blue-600 transition-colors"><Facebook size={14} /></a>}
                          {item.isActive === false && (
                            <span className="text-[10px] text-red-600 border border-red-300 px-2 py-0.5 rounded-full ml-1">Inactive</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4 pt-3 border-t border-slate-200">
                      <button
                        onClick={() => openEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:border-indigo-400 hover:text-indigo-700 transition-colors"
                      >
                        <Pencil size={13} /> Edit
                      </button>
                      <button
                        onClick={() =>
                          askConfirmation({
                            title: "Delete Member",
                            description: `Remove "${item.name}" from Tech Titans?`,
                            confirmLabel: "Delete",
                            confirmVariant: "destructive",
                            action: () => deleteTechTitan(item._id),
                          })
                        }
                        className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}
