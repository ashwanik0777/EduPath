import { Card, CardContent } from "@/app/components/ui/card"

const services = [
  {
    title: "Master Counsellor Bundle",
    desc: "8 Course Bundle · Become Pro Counsellor",
    price: "₹50,500 ₹27,000",
  },
  {
    title: "Certification for Students",
    desc: "16 Modules · Guide School Students",
    price: "₹15,000 ₹10,000",
  },
  {
    title: "Job Readiness Toolkit",
    desc: "17+ Modules · 30+ Hours Training",
    price: "₹5,000 ₹2,000",
  },
]

export default function Services() {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-[#704DC6]">Our Counselling Services</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-6">
        {services.map((s, i) => (
          <Card key={i} className="rounded-2xl shadow-md hover:shadow-xl transition bg-gradient-to-br from-[#F76CB4] to-[#CD3A99] text-white">
            <CardContent className="p-6 flex flex-col">
              <h3 className="font-semibold text-xl mb-2">{s.title}</h3>
              <p className="mb-3">{s.desc}</p>
              <p className="font-bold">{s.price}</p>
              <button className="mt-4 px-4 py-2 bg-[#FFCC59] text-black rounded-xl hover:scale-105 transition">
                Enroll Now
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
