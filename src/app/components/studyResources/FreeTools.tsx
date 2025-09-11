const tools = [
  { name: "NCERT PDFs", desc: "Free NCERT books & solutions for all classes" },
  { name: "YouTube Learning Channels", desc: "Top free channels for JEE, NEET, UPSC" },
  { name: "Mock Test Platform", desc: "Attempt free mock tests for various exams" },
  { name: "Resume Builder", desc: "AI-powered free resume creation tool" },
  { name: "Scholarship Alerts", desc: "Get notified of all govt. scholarships" },
]

export default function FreeTools() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">🎁 Free Tools & Materials</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((t, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-[#704DC6] mb-2">{t.name}</h3>
              <p className="text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
