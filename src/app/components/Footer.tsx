import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Career Assessment", href: "/careerAssessment" },
  { label: "Government Colleges", href: "/governmentCollege" },
  { label: "Study Resources", href: "/studyResources" },
  { label: "Competitive Exams", href: "/competitiveExams" },
  { label: "Pricing", href: "/pricing" },
];

const studentLinks = [
  { label: "Student Dashboard", href: "/studentDashboard" },
  { label: "Notifications", href: "/notifications" },
  { label: "Quiz Corner", href: "/quiz" },
  { label: "Tech Titans", href: "/techTitans" },
  { label: "Register", href: "/register" },
  { label: "Login", href: "/login" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-400" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-400" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-500" },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-500" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0b1120] text-white" role="contentinfo" aria-label="Site footer">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand + Social */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="EduPath Home">
              <img src="/EdupathLogo.png" alt="EduPath Logo" className="h-12 w-auto rounded-full" />
              <span className="text-lg font-bold tracking-tight text-white">EduPath</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              EduPath empowers students across India with personalized career guidance, college discovery, psychometric assessments, and expert counseling — all in one platform.
            </p>
            <div className="flex gap-3" aria-label="Social media links">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 transition-colors ${color} hover:bg-white/10`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Explore EduPath">
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {exploreLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Student & Tools */}
          <nav aria-label="Student links">
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">Students</h3>
            <ul className="space-y-2.5">
              {studentLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-1 group"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-0.5 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <section aria-label="Contact information">
            <h3 className="font-semibold text-white text-sm uppercase tracking-widest mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Greater Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+911202344000" className="hover:text-indigo-400 transition-colors">
                  +91-120-234-4000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:support@edupath.in" className="hover:text-indigo-400 transition-colors">
                  support@edupath.in
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Career Guidance Platform for Students across India</span>
              </li>
            </ul>
          </section>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} EduPath. All rights reserved.</p>

          <p>
            Designed &amp; built by{" "}
            <Link href="/techTitans" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
              Tech Titans
            </Link>
          </p>

          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-indigo-400 transition-colors">
              Terms of Use
            </Link>
            <Link href="/sitemap" className="hover:text-indigo-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
