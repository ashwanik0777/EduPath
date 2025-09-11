const benefits = [
  "Discover your hidden strengths & weaknesses",
  "Choose the right stream, course, or career path",
  "Avoid wrong career decisions & save years of struggle",
  "Boost your confidence with career clarity",
  "Trusted by schools, colleges, and professionals worldwide",
]

export default function Benefits() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10">Benefits of Career Assessments</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-center justify-center gap-3">
              <span className="text-indigo-600 font-bold">✔</span> {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
