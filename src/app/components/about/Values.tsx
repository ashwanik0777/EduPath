const values = [
  { title: "Integrity", desc: "We believe in transparency and honesty in every counselling session." },
  { title: "Innovation", desc: "We bring the latest tools, assessments, and learning methods." },
  { title: "Empathy", desc: "We understand and respect every individual's career journey." },
  { title: "Excellence", desc: "We strive to deliver world-class services with measurable impact." },
]

export default function Values() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-xl mb-3">{val.title}</h3>
              <p className="text-gray-600">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
