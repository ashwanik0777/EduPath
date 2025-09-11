"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="max-w-md w-full bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-8 mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back 👋</h2>
      <p className="text-center text-white/80 mb-8">Login to continue your journey</p>

      <form className="space-y-6">
        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 focus:bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#704DC6] outline-none"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/80 focus:bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#704DC6] outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {/* Remember Me + Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-white/80 space-x-2">
            <input type="checkbox" className="w-4 h-4 rounded text-[#704DC6]" />
            <span>Remember Me</span>
          </label>
          <a href="/forgot-password" className="text-[#FFCC59] hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-gradient-to-r from-[#704DC6] to-[#CD3A99] text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          Login
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-1 border-white/30" />
        <span className="px-4 text-white/70">OR</span>
        <hr className="flex-1 border-white/30" />
      </div>

      {/* Social Logins */}
      <div className="flex gap-4">
        <button className="flex-1 py-2 bg-white/80 text-gray-800 rounded-lg shadow hover:bg-white transition">
          Continue with Google
        </button>
        <button className="flex-1 py-2 bg-white/80 text-gray-800 rounded-lg shadow hover:bg-white transition">
          Continue with Facebook
        </button>
      </div>

      {/* Signup Link */}
      <p className="mt-6 text-center text-white/80">
        Don’t have an account?{" "}
        <a href="/register" className="text-[#FFCC59] font-semibold hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  )
}
