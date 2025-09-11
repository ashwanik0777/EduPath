const tests = [
  { name: "Ideal Career Test", q: 180, time: "45 Min", price: "₹2000", offer: "₹1000", audience: "For All Age Groups" },
  { name: "Skill Based Test (Class 9th)", q: 40, time: "30 Min", price: "₹2000", offer: "₹1000", audience: "For Class 9th" },
  { name: "Stream Selector Test", q: 76, time: "40 Min", price: "₹2000", offer: "₹1000", audience: "For Class 10th" },
  { name: "Engineering Selector", q: 100, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For 11th & 12th" },
  { name: "Humanities Selector", q: 76, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For 11th, 12th & B.A" },
  { name: "Commerce Selector", q: 72, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For 11th, 12th & B.Com" },
  { name: "Professional Skill Index", q: 80, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "Grads & Working" },
  { name: "Educator Professional Skills", q: 63, time: "60 Min", price: "₹2000", offer: "₹1000", audience: "For Educators" },
]

export default function AssessmentsList() {
  return (
    <section id="assessments" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">Available Assessments</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.map((test, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold mb-2">{test.name}</h3>
              <p className="text-gray-500 text-sm mb-3">{test.audience}</p>
              <p className="text-sm text-gray-600">Questions: {test.q} • Duration: {test.time}</p>
              <div className="mt-4">
                <span className="line-through text-gray-400 mr-2">{test.price}</span>
                <span className="text-indigo-600 font-bold">{test.offer}</span>
              </div>
              <a 
                href="/buy" 
                className="mt-5 inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Take Test
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
