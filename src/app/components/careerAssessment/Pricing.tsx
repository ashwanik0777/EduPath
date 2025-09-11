export default function Pricing() {
  return (
    <section className="py-20 bg-indigo-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Special Pricing</h2>
        <p className="mb-8 text-lg">All assessments available at a flat discount for a limited time.</p>
        <a 
          href="/buy" 
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          Get Started for ₹1000
        </a>
      </div>
    </section>
  )
}
