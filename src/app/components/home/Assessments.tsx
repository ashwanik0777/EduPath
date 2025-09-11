import { Card, CardContent } from "@/app/components/ui/card"

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
      <h2 className="text-3xl font-bold text-center mb-10 text-[#704DC6]">Psychometric Assessments</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6">
        {tests.map((t, i) => (
          <Card key={i} className="rounded-2xl shadow-md hover:shadow-xl transition bg-white">
            <CardContent className="p-6 flex flex-col">
              <h3 className="font-semibold text-lg mb-2">{t.name}</h3>
              <p className="text-gray-600 mb-2">{t.details}</p>
              <p className="text-[#CD3A99] font-bold mb-2">{t.price}</p>
              <span className="text-sm text-gray-500 mb-4">{t.target}</span>
              <button className="mt-auto px-4 py-2 bg-[#2E969A] text-white rounded-xl hover:bg-[#237577] transition">
                Take Test
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
