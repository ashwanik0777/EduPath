import { Trash2 } from "lucide-react"

type Item = Record<string, unknown> & { _id: string }

type TechTitansTabProps = {
  techTitanForm: {
    name: string
    role: string
    specialization: string
    bio: string
    imageUrl: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
    yearsOfExperience: number
    isActive: boolean
  }
  setTechTitanForm: React.Dispatch<React.SetStateAction<{
    name: string
    role: string
    specialization: string
    bio: string
    imageUrl: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
    yearsOfExperience: number
    isActive: boolean
  }>>
  techTitans: Item[]
  techTitansSearch: string
  setTechTitansSearch: React.Dispatch<React.SetStateAction<string>>
  loadTechTitans: (query?: string) => Promise<void>
  createTechTitan: (payload: Record<string, unknown>) => Promise<void>
  deleteTechTitan: (id: string) => Promise<void>
  askConfirmation: (config: {
    title: string
    description: string
    confirmLabel: string
    confirmVariant?: "default" | "destructive"
    action: () => Promise<void>
  }) => void
}

export function TechTitansTab({
  techTitanForm,
  setTechTitanForm,
  techTitans,
  techTitansSearch,
  setTechTitansSearch,
  loadTechTitans,
  createTechTitan,
  deleteTechTitan,
  askConfirmation,
}: TechTitansTabProps) {
  return (
    <div className="space-y-5 animate-in fade-in-0 slide-in-from-bottom-1 duration-300">
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold mb-3">Add Tech Titan Member</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input value={techTitanForm.name} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="Full Name" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={techTitanForm.role} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, role: event.target.value }))} placeholder="Role (e.g. Lead Engineer)" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={techTitanForm.specialization} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, specialization: event.target.value }))} placeholder="Specialization" className="border border-slate-300 rounded-lg px-3 py-2" />
          <textarea value={techTitanForm.bio} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, bio: event.target.value }))} placeholder="Detailed bio" className="border border-slate-300 rounded-lg px-3 py-2 md:col-span-3 min-h-[100px]" />
          <input value={techTitanForm.imageUrl} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, imageUrl: event.target.value }))} placeholder="Image URL" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={techTitanForm.linkedinUrl} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, linkedinUrl: event.target.value }))} placeholder="LinkedIn URL" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={techTitanForm.githubUrl} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, githubUrl: event.target.value }))} placeholder="GitHub URL" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input value={techTitanForm.portfolioUrl} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, portfolioUrl: event.target.value }))} placeholder="Portfolio URL" className="border border-slate-300 rounded-lg px-3 py-2" />
          <input type="number" min={0} max={60} value={techTitanForm.yearsOfExperience} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, yearsOfExperience: Number(event.target.value) || 0 }))} placeholder="Years of Experience" className="border border-slate-300 rounded-lg px-3 py-2" />
          <select value={String(techTitanForm.isActive)} onChange={(event) => setTechTitanForm((prev) => ({ ...prev, isActive: event.target.value === "true" }))} className="border border-slate-300 rounded-lg px-3 py-2">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <button
          onClick={() => createTechTitan(techTitanForm)}
          className="mt-3 rounded-lg bg-slate-900 text-white px-4 py-2"
        >
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold">Tech Titan Members</h4>
          <div className="flex gap-2">
            <input
              value={techTitansSearch}
              onChange={(event) => setTechTitansSearch(event.target.value)}
              placeholder="Search name / role"
              className="border border-slate-300 rounded px-2 py-1"
            />
            <button onClick={() => loadTechTitans(techTitansSearch)} className="rounded border border-slate-300 px-2 py-1">Search</button>
          </div>
        </div>

        <div className="space-y-2">
          {techTitans.map((item) => (
            <div key={item._id} className="border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="font-medium">{String(item.name || "-")}</p>
                <p className="text-xs text-slate-500">{String(item.role || "-")} • {String(item.specialization || "-")}</p>
                {item.bio ? <p className="text-xs text-slate-600 mt-1 line-clamp-2">{String(item.bio)}</p> : null}
              </div>

              <button
                onClick={() =>
                  askConfirmation({
                    title: "Delete member",
                    description: `Delete ${String(item.name || "this member")} from Tech Titans list?`,
                    confirmLabel: "Delete",
                    confirmVariant: "destructive",
                    action: async () => deleteTechTitan(item._id),
                  })
                }
                className="text-rose-600 hover:text-rose-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
