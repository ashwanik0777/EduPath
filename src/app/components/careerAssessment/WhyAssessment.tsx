const points = [
  { title: "Scientific & Reliable", desc: "Meticulously designed tests based on global career frameworks." },
  { title: "Personalized Insights", desc: "Get deep insights about your career interests, skills, and personality." },
  { title: "For Every Stage", desc: "Whether you are in school, college, or working – we have the right test." },
  { title: "Instant Reports", desc: "Get detailed results immediately with career recommendations." },
]

export default function WhyAssessment() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Our Assessments?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p, i) => (
            <div key={i} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-3">{p.title}</h3>
              <p className="text-gray-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
