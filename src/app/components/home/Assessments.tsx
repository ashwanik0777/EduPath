import { Card, CardContent } from "@/app/components/ui/card"
import { User } from "lucide-react"

const tests = [
  {
    name: "PSYCHOMETRIC IDEAL CAREER TEST™",
    details: "180 Questions · 45 Minutes",
    price: "₹2000 ₹1000",
    target: "For All Age Groups",
  },
  {
    name: "STREAM SELECTOR™",
    details: "76 Questions · 40 Minutes",
    price: "₹2000 ₹1000",
    target: "For Class 10th",
  },
  {
    name: "ENGINEERING SELECTOR",
    details: "100 Questions · 60 Minutes",
    price: "₹2000 ₹1000",
    target: "11th & 12th",
  },
]

export default function Assessments() {
  return (
    <section className="py-16 bg-[#F9F6FF]">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#2E358B] tracking-tight drop-shadow-sm">
        Psychometric Assessments
      </h2>
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 px-5">
        {tests.map((t, i) => (
          <Card
            key={i}
            className="rounded-2xl bg-white shadow-lg border border-[#ECE6F9]
              flex flex-col hover:shadow-2xl hover:-translate-y-2
              transition-all duration-300 relative overflow-visible"
          >
            <CardContent className="p-7 flex flex-col">
              {/* Lucide user icon as a composed cover image */}
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#F2F1FA] shadow border border-[#E0D7F8] mb-4 mx-auto">
                <User className="w-9 h-9 text-[#C3BAD9]" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-[#2E358B] text-lg mb-1 text-center">{t.name}</h3>
              <p className="text-gray-600 text-center mb-1">{t.details}</p>
              <p className="text-[#CD3A99] font-bold text-center mb-1">{t.price}</p>
              <span className="block text-xs text-gray-500 mb-5 text-center">{t.target}</span>
              <button
                className="mt-auto px-4 py-2 rounded-xl bg-[#2E358B] text-white font-semibold shadow-sm
                  hover:bg-[#222966] hover:shadow-lg hover:scale-105
                  focus:outline-none focus:ring-2 focus:ring-[#704DC6]/40 focus:ring-offset-2
                  transition-all duration-200"
              >
                Take Test
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
