export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#3F3D56] to-[#6C63FF] text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Take Your First Step Towards a Better Career</h2>
        <p className="mb-8 text-lg">
          Explore our career assessments and unlock your true potential today.
        </p>
        <a 
          href="/buy" 
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          Start Now
        </a>
      </div>
    </section>
  )
}
