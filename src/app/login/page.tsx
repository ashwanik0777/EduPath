"use client";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Separator } from "@/app/components/ui/separator";
import {
  GraduationCap, User, Lock, ArrowRight, Mail, Github, Check
} from "lucide-react";
import { IoLogoGoogle, IoLogoFacebook, IoLogoTwitter, IoLogoApple } from "react-icons/io5";

// Example: Accessing a client ID from .env (must start with REACT_APP_)
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        setError(result.message || "Login failed. Please try again.");
      } else {
        setSuccess(true);
        window.location.href = "/studentDashboard";
      }
    } catch (e: any) {
      setError(e.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left branding section START */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-gradient-to-br from-amber-300 to-amber-400 flex-col justify-center p-8 relative overflow-hidden">
        {/* Animated Blobs and Floating Objects */}
        <div className="blob-animation absolute top-[15%] left-[20%] w-64 h-64 bg-cyan-500/30 rounded-full"></div>
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center mb-12 glow-effect">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 rounded-xl mr-3 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-indigo-800 drop-shadow-md">EduPath</h1>
              <p className="text-sm text-indigo-700">Counseling PLATFORM</p>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 drop-shadow-md">
              Already Signed up?
            </h2>
            <p className="text-indigo-700 text-lg mb-8">Log in to your account<br />so you can continue</p>
            <Link href="/register">
              <Button variant="outline" className="h-12 px-6 bg-white/80 text-indigo-800 border-indigo-300 font-medium rounded-lg w-40 shadow-md btn-3d">
                SIGN UP NOW
              </Button>
            </Link>
          </div>
          <div className="text-indigo-800 text-sm mt-auto">&copy;2025 EduPath</div>
        </div>
      </div>
      {/* Left branding section END */}

      {/* Right - Login form section START */}
      <div className="w-full md:w-7/12 lg:w-1/2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 md:p-8 lg:p-12 flex items-center justify-center relative">
        <div className="w-full max-w-md mt-16 md:mt-0">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">Welcome Back!</h2>
            <p className="text-indigo-300 text-sm">
              Sign in to continue to your personalized Counseling journey
            </p>
          </div>

          <div className="glass p-6 rounded-xl shadow-2xl border border-indigo-800/50 mb-6">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="text-indigo-200 flex items-center mb-1">
                  <User className="h-4 w-4 mr-2 opacity-70" />
                  Email
                </label>
                <Input 
                  placeholder="Enter your email"
                  className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                  {...form.register("email")}
                />
                <span className="text-red-400">{form.formState.errors.email?.message}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-indigo-200 flex items-center">
                    <Lock className="h-4 w-4 mr-2 opacity-70" />
                    Password
                  </label>
                  <Link href="/passwordReset" className="text-xs text-amber-300 hover:text-amber-200">Forgot password?</Link>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500"
                  {...form.register("password")}
                />
                <span className="text-red-400">{form.formState.errors.password?.message}</span>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-indigo-600 border-indigo-500 rounded" />
                <label htmlFor="remember" className="ml-2 text-sm text-indigo-300">Remember me</label>
              </div>

              {/* Display error/success */}
              {error && <div className="bg-red-900/50 text-red-200 p-3 rounded-lg text-sm">{error}</div>}
              {success && <div className="bg-emerald-900/50 text-emerald-200 p-3 rounded-lg text-sm flex items-center"><Check className="h-5 w-5 mr-2"/><span>Login successful (demo only, no backend connected)</span></div>}
              
              <Button type="submit" className="w-full h-12 rounded-lg text-base font-medium bg-gradient-to-r from-amber-300 to-amber-400 text-indigo-950 btn-3d">
                <span className="mr-1">SIGN IN</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </div>
          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full border-indigo-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-indigo-950 px-3 text-indigo-400">Or sign in using</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800 relative">
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-lg mr-3">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-indigo-200 text-sm font-medium">Email</h5>
                    <p className="text-indigo-400 text-xs mt-1">Sign in with email</p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800 relative">
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-3">
                    <IoLogoGoogle className="h-4 w-4 text-[#4285F4]" />
                  </div>
                  <div>
                    <h5 className="text-indigo-200 text-sm font-medium">Google</h5>
                    <p className="text-indigo-400 text-xs mt-1">Sign in with Google</p>
                    <span className="text-[10px] text-indigo-400 break-words">ClientID: {GOOGLE_CLIENT_ID || "(not set)"}</span>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800 relative">
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-black p-2 rounded-lg mr-3">
                    <Github className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-indigo-200 text-sm font-medium">GitHub</h5>
                    <p className="text-indigo-400 text-xs mt-1">Sign in with GitHub</p>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-900/40 rounded-lg p-3 border border-indigo-800 relative">
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-black p-2 rounded-lg mr-3">
                    <IoLogoApple className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h5 className="text-indigo-200 text-sm font-medium">Apple</h5>
                    <p className="text-indigo-400 text-xs mt-1">Sign in with Apple</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden text-center mt-8">
            <p className="text-indigo-300">
              New here?{" "}
              <Link href="/register" className="text-gradient bg-gradient-to-r from-amber-300 to-amber-500 font-medium">Create an account</Link>
            </p>
          </div>
          {/* Desktop: Data security and footer links left as in your code */}
        </div>
      </div>
      {/* Right - Login form section END */}
    </div>
  );
}
