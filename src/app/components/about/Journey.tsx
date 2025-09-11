export default function Journey() {
  const timeline = [
    { year: "2011", event: "CareerGuide was founded" },
    { year: "2014", event: "Launched first Psychometric Career Test" },
    { year: "2017", event: "Reached 1 Million Students" },
    { year: "2020", event: "Expanded Counsellor Network Across India" },
    { year: "2023", event: "Trusted by 5000+ Schools & Colleges" },
  ]

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="flex items-center space-x-6">
              <span className="font-bold text-indigo-600">{item.year}</span>
              <p className="text-gray-700">{item.event}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
