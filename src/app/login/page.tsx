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
  GraduationCap,
  User,
  Lock,
  ArrowRight,
  Mail,
  Github,
  Check,
  CalendarDays,
  BookOpen,
  ShieldCheck,
} from "lucide-react";
import { IoLogoGoogle, IoLogoApple } from "react-icons/io5";

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
        const userRole = result?.user?.role;
        if (userRole === "admin") {
          window.location.href = "/adminDashboard";
        } else if (userRole === "counselor") {
          window.location.href = "/counselorDashboard";
        } else {
          window.location.href = "/studentDashboard";
        }
      }
    } catch (e: any) {
      setError(e.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 md:px-8 md:py-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
        <section className="relative border-b border-slate-200 bg-slate-50 p-6 md:p-10 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-3 shadow-sm">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">EduPath</h1>
              <p className="text-xs tracking-wide text-slate-500">CAREER GUIDANCE & COUNSELING</p>
            </div>
          </div>

          <div className="mt-10 space-y-4">
            <h2 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              Welcome back to your counseling workspace
            </h2>
            <p className="max-w-xl text-base text-slate-600">
              Continue student mentoring, track career progress, and manage sessions from one secure platform.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-slate-900">
                <CalendarDays className="h-4 w-4 text-indigo-600" />
                <p className="text-sm font-semibold">Session Planning</p>
              </div>
              <p className="mt-1 text-xs text-slate-600">Schedule and manage counseling sessions with students.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-slate-900">
                <BookOpen className="h-4 w-4 text-indigo-600" />
                <p className="text-sm font-semibold">Career Guidance</p>
              </div>
              <p className="mt-1 text-xs text-slate-600">Support students with exams, scholarships, and career pathways.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:col-span-2">
              <div className="flex items-center gap-2 text-slate-900">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <p className="text-sm font-semibold">Secure & Role-Based Access</p>
              </div>
              <p className="mt-1 text-xs text-slate-600">Admin, counselor, and student dashboards open automatically after sign in.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>New to EduPath?</span>
            <Link href="/register" className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-1.5 font-medium text-slate-800 hover:bg-slate-100">
              Create account
            </Link>
          </div>
        </section>

        <section className="flex items-center justify-center bg-white p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Sign in</h3>
              <p className="mt-1 text-sm text-slate-600">Use your registered credentials to continue.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="mb-1 flex items-center text-sm font-medium text-slate-700">
                    <User className="mr-2 h-4 w-4 text-slate-500" />
                    Email
                  </label>
                  <Input
                    placeholder="Enter your email"
                    className="h-11 rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                    {...form.register("email")}
                  />
                  <span className="text-xs text-rose-600">{form.formState.errors.email?.message}</span>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className="flex items-center text-sm font-medium text-slate-700">
                      <Lock className="mr-2 h-4 w-4 text-slate-500" />
                      Password
                    </label>
                    <Link href="/passwordReset" className="text-xs font-medium text-indigo-600 hover:text-indigo-700">
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="h-11 rounded-lg border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                    {...form.register("password")}
                  />
                  <span className="text-xs text-rose-600">{form.formState.errors.password?.message}</span>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                  <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                    Remember me
                  </label>
                </div>

                {error && <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">{error}</div>}
                {success && (
                  <div className="flex items-center rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                    <Check className="mr-2 h-5 w-5" />
                    <span>Login successful.</span>
                  </div>
                )}

                <Button type="submit" className="h-11 w-full rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                  <span className="mr-1">Sign in</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div className="mt-6">
              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-3 text-slate-500">Available sign-in methods</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-indigo-600 p-2">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Email</p>
                      <p className="text-xs text-slate-500">Primary authentication method</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-2">
                      <IoLogoGoogle className="h-4 w-4 text-[#4285F4]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Google</p>
                      <p className="text-xs text-slate-500">Client ID configured: {GOOGLE_CLIENT_ID ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-slate-900 p-2">
                      <Github className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">GitHub</p>
                      <p className="text-xs text-slate-500">OAuth setup ready for activation</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-slate-900 p-2">
                      <IoLogoApple className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Apple</p>
                      <p className="text-xs text-slate-500">Enterprise login option</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
