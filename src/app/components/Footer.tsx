import React from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Camera,
  Linkedin,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer
      className="bg-[#0e1626] text-white px-6 md:px-20 py-10"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div>
          <Link href="/" className="flex items-center" aria-label="GBU Home">
              <img
                src="/logo.svg"
                alt="GBU Logo"
                className="h-14 w-auto bg-white rounded-lg py-1 px-2"
              />
            </Link>
          <p className="text-gray-400 text-sm mt-4">
            Gautam Buddha University, Greater Noida, is committed to providing
            world-class education and fostering innovation for a better
            tomorrow.
          </p>
         <div
      className="flex gap-4 mt-4 text-xl"
      aria-label="Social media links"
    >
      <Facebook className="w-6 h-6 text-blue-600 hover:text-blue-800" />

        <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition-colors" />
        <Camera className="w-6 h-6 text-gray-600 hover:text-black transition-colors" />
        <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-900 transition-colors" />
        <Youtube className="w-6 h-6 text-red-600 hover:text-red-800 transition-colors" />
    </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              "About GBU",
              "Admissions",
              "Academic Programs",
              "Research",
              "Campus Life",
              "Placements",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Important Links */}
        <nav aria-label="Important links">
          <h3 className="font-semibold text-lg mb-3">Important Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              "Student Portal",
              "Faculty Portal",
              "Online Fee Payment",
              "Library",
              "Examination",
              "Alumni",
            ].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <section aria-label="Contact information">
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <address className="not-italic text-gray-300 text-sm">
            <strong>Address:</strong>
            <br />
            Gautam Buddha University
            <br />
            Greater Noida, Uttar Pradesh
            <br />
            PIN: 201312
          </address>
          <p className="mt-2 text-sm text-gray-300">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+911202344000"
              className="hover:text-orange-500"
            >
              +91-120-234-4000
            </a>
            <br />
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@gbu.ac.in"
              className="hover:text-orange-500"
            >
              info@gbu.ac.in
            </a>
          </p>
          <div className="mt-4">
            <label
              htmlFor="newsletter-email"
              className="font-semibold text-sm block mb-1"
            >
              Subscribe to Newsletter
            </label>
            {/* <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-white bg-[#1a202c] rounded-l-md outline-none focus:ring-2 focus:ring-orange-500"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 rounded-r-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Subscribe
              </button>
            </form> */}
          </div>
        </section>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between">
        <p>© 2025 Gautam Buddha University. All rights reserved.</p>
        <div>
          <p>
            Designed and developed by{" "}
            <a href="#" className="hover:text-white font-semibold cursor-pointer">
              Cognitive Geeks 
            </a>{" "}
           
            {/* and supported by{" "}
            <Link href="#" className="hover:text-white font-semibold">
              CCC
            </Link> */}
          </p>
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          {["Privacy Policy", "Terms of Use", "Sitemap"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
