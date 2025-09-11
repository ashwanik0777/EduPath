const steps = [
  { step: "1", title: "Choose Assessment", desc: "Pick the test that suits your education or career stage." },
  { step: "2", title: "Attempt Online Test", desc: "Answer questions designed by experts in 30-60 minutes." },
  { step: "3", title: "Get Instant Report", desc: "Receive detailed insights with career path suggestions." },
  { step: "4", title: "Counselling Support", desc: "Book a session with certified counsellors for guidance." },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-indigo-600 text-white text-lg font-bold">
                {s.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
