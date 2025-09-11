export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#3F3D56] to-[#6C63FF] text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
        <p className="mb-8 text-lg">
          Join thousands of students & professionals who have found clarity and success with CareerGuide.
        </p>
        <a 
          href="/contact" 
          className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition"
        >
          Get Started Today
        </a>
      </div>
    </section>
  )
}
