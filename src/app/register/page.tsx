"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/app/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import {
  GraduationCap,
  Lock,
  ArrowRight,
  Check,
  Users,
  Brain,
  BarChart2,
  CheckCircle2,
  Sparkles,
  Loader2,
  UserPlus,
  ChevronLeft,
  Calendar,
  AtSign,
  User,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
    title: "AI-Powered Counseling",
    desc: "Personalized career paths that adapt to your strengths and goals.",
  },
  {
    icon: BarChart2,
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
    title: "Progress Analytics",
    desc: "Track your journey with real-time insights and milestones.",
  },
  {
    icon: CheckCircle2,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    title: "Smart Recommendations",
    desc: "Data-driven college & exam suggestions matched to your profile.",
  },
];

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  academicLevel: z.enum(
    ["elementary", "middle_school", "high_school", "undergraduate", "graduate", "postgraduate"] as const,
    { message: "Please select your academic level" }
  ),
  dob: z.string().min(8, "Please enter your date of birth"),
  gender: z.enum(["male", "female", "other"] as const, {
    message: "Please select your gender",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      academicLevel: undefined,
      dob: "",
      gender: undefined,
    },
    mode: "onChange",
  });

  const validateStep1 = async () => {
    const ok = await form.trigger(["fullName", "email", "password", "dob", "gender"]);
    if (ok) setStep(2);
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        setError(err.message || (err.errors && err.errors[0]?.message) || "Registration failed. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) window.location.href = "/quiz";
  }, [success]);

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : "translateX(32px)",
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* ── LEFT PANEL — FORM (white) ── */}
      <section className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 md:px-14 lg:order-1">
        <div className="w-full max-w-md">
          <div className="mb-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">
              {step === 1 ? "Step 1 of 2 — Personal Info" : "Step 2 of 2 — Academic Profile"}
            </p>
            <h2 className="mt-1 text-3xl font-black text-slate-900">Create account</h2>
            <p className="mt-1.5 text-sm text-slate-500">
              {step === 1
                ? "Fill in your basic details to get started."
                : "Almost there — tell us about your academics."}
            </p>
          </div>

          {/* step dots */}
          <div className="mb-7 flex items-center gap-2">
            <span className="h-2 w-8 rounded-full bg-indigo-600 transition-all duration-500" />
            <span
              className={`h-2 rounded-full transition-all duration-500 ${
                step === 2 ? "w-8 bg-indigo-600" : "w-4 bg-slate-200"
              }`}
            />
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && (
                <>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Full Name
                        </label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="Aisha Rahman"
                              className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                            />
                            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Email
                        </label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="email"
                              placeholder="you@example.com"
                              className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                            />
                            <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Password
                        </label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type="password"
                              placeholder="••••••••"
                              className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                            />
                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                            Date of Birth
                          </label>
                          <FormControl>
                            <div className="relative">
                              <Input
                                {...field}
                                placeholder="DD/MM/YYYY"
                                className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                              />
                              <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs text-rose-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                            Gender
                          </label>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus:ring-indigo-500">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-xs text-rose-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={validateStep1}
                    className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Username
                        </label>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              placeholder="aisha_r"
                              className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                            />
                            <AtSign className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="academicLevel"
                    render={({ field }) => (
                      <FormItem>
                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Academic Level
                        </label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 focus:ring-indigo-500">
                              <SelectValue placeholder="Select your level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="elementary">Elementary School</SelectItem>
                            <SelectItem value="middle_school">Middle School</SelectItem>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="undergraduate">University — Undergraduate</SelectItem>
                            <SelectItem value="graduate">University — Graduate</SelectItem>
                            <SelectItem value="postgraduate">Post-Graduation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <Check className="h-4 w-4 flex-none" />
                      <span>Account created! Redirecting to quiz…</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Creating account…</>
                    ) : (
                      <><UserPlus className="h-4 w-4" /> Create Account</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex h-10 w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back
                  </button>
                </>
              )}
            </form>
          </Form>

          <p className="mt-8 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} EduPath &mdash; Jammu & Kashmir Career Guidance Portal
          </p>
        </div>
      </section>

      {/* ── WAVE DIVIDER (mirrored from login) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-20 hidden lg:block"
        style={{ left: "calc(48% - 48px)", width: "96px" }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 96 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 0 L 48 0 C 6 75, 0 150, 24 225 C 48 300, 96 375, 72 450 C 48 525, 0 600, 24 675 C 48 750, 96 825, 48 900 L 0 900 Z"
            fill="white"
          />
          <path
            d="M 96 0 L 48 0 C 6 75, 0 150, 24 225 C 48 300, 96 375, 72 450 C 48 525, 0 600, 24 675 C 48 750, 96 825, 48 900 L 96 900 Z"
            fill="#0f172a"
          />
          <path
            d="M 48 0 C 6 75, 0 150, 24 225 C 48 300, 96 375, 72 450 C 48 525, 0 600, 24 675 C 48 750, 96 825, 48 900"
            fill="none"
            stroke="rgba(99,102,241,0.35)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── RIGHT PANEL — INFO (dark slate-900) ── */}
      <section
        className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-8 md:p-12 lg:order-2 lg:w-[52%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 80% 10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 90%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      >
        {/* dot-grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* giant decorative letter */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-6 -top-10 select-none text-[22rem] font-black leading-none text-white"
          style={{ opacity: 0.025 }}
        >
          R
        </span>
        {/* accent rings */}
        <span aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full border border-indigo-500/20" />
        <span aria-hidden className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full border border-indigo-500/10" />

        <div className="relative z-10">
          {/* brand */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-600 p-3 shadow-lg shadow-indigo-600/40">
              <GraduationCap className="h-7 w-7 text-white" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-white">EduPath</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-400/80">
                Career Guidance Platform
              </p>
            </div>
          </div>

          {/* headline */}
          <div className="mt-12">
            <h1 className="text-4xl font-black leading-[1.1] text-white md:text-5xl">
              Start your{" "}
              <span className="relative inline-block text-indigo-400">
                journey
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-indigo-500/60" />
              </span>
              <br />
              to a better future
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
              Join thousands of J&K students who found their path with expert counselors, AI-based assessments, and real college data.
            </p>
          </div>

          {/* free badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            100% Free — No Credit Card Required
          </div>

          {/* features */}
          <div className="mt-8 space-y-4">
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl border ${bg}`}>
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* stat chips */}
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { value: "12,400+", label: "Students registered", icon: Users },
              { value: "Free", label: "Always accessible", icon: CheckCircle2 },
            ].map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm"
              >
                <Icon className="h-4 w-4 text-indigo-400" />
                <div>
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-[10px] text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom link */}
        <div className="relative z-10 mt-12 flex items-center gap-3 text-sm text-slate-500">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="font-semibold text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </section>
    </div>
  );
}
