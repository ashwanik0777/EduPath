const stats = [
  { number: "10+", label: "Years of Experience" },
  { number: "5000+", label: "Counsellors Trained" },
  { number: "2M+", label: "Students Guided" },
  { number: "1000+", label: "Institutions Served" },
]

export default function Achievements() {
  return (
    <section className="py-20 bg-indigo-600 text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((s, i) => (
          <div key={i}>
            <h3 className="text-3xl md:text-4xl font-bold">{s.number}</h3>
            <p className="mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
