import { Card, CardContent } from "../ui/card"

const counsellors = [
  { name: "Surabhi Dewra", exp: "12 years" },
  { name: "Adnan Buland", exp: "16 years" },
  { name: "Pranav Bhatia", exp: "14 years" },
  { name: "Deepti Sharma", exp: "10 years" },
]

export default function Counsellors() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#704DC6]">Career Counsellors</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 px-6">
        {counsellors.map((c, i) => (
          <Card key={i} className="rounded-2xl shadow-md hover:shadow-xl transition">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#CD3A99] to-[#F76CB4] flex items-center justify-center text-white text-2xl font-bold mb-4">
                {c.name[0]}
              </div>
              <h3 className="font-semibold">{c.name}</h3>
              <p className="text-sm text-gray-500">Exp: {c.exp}</p>
              <button className="mt-3 px-4 py-2 bg-[#2E969A] text-white rounded-xl hover:bg-[#237577] transition">
                Talk
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
