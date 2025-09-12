import { Card, CardContent } from "../ui/card"
import { User } from "lucide-react"

const counsellors = [
  { name: "Surabhi Dewra", exp: "12 years" },
  { name: "Adnan Buland", exp: "16 years" },
  { name: "Pranav Bhatia", exp: "14 years" },
  { name: "Deepti Sharma", exp: "10 years" },
]

export default function Counsellors() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <h2 className="text-3xl font-bold text-center mb-12 text-[#2E358B] tracking-tight drop-shadow-md">
        Career Counsellors
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-6">
        {counsellors.map((c, i) => (
          <Card
            key={i}
            className="group rounded-2xl bg-white/90 shadow-xl border border-blue-100
              transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-visible"
          >
            <CardContent className="p-8 flex flex-col items-center">
              {/* Fallback user icon for avatar */}
              <span className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 shadow border border-blue-200">
                <User className="w-10 h-10 text-[#2E358B]/60" strokeWidth={2} />
              </span>
              <h3 className="font-semibold text-blue-900 text-lg tracking-tight mb-1 text-center group-hover:text-[#2E358B] transition">{c.name}</h3>
              <p className="text-sm text-gray-500 mb-4 text-center">Experience: <span className="text-[#2E969A] font-medium">{c.exp}</span></p>
              <button
                className="mt-2 px-5 py-2 rounded-xl bg-[#2E358B] text-white font-semibold shadow-sm hover:bg-[#1d235e]
                  hover:shadow-lg hover:scale-[1.03] active:scale-100 focus:outline-none focus:ring-2 focus:ring-[#2E358B]/30 focus:ring-offset-2
                  transition-all duration-200"
              >
                Talk
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
