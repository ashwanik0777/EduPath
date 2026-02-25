"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/app/components/ui/input";
import {
  GraduationCap,
  Lock,
  ArrowRight,
  Check,
  Users,
  BookOpen,
  TrendingUp,
  Sparkles,
  Mail,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const forgotRequestSchema = z.object({
  forgotEmail: z.string().email("Please enter a valid email address"),
});
type ForgotRequestValues = z.infer<typeof forgotRequestSchema>;

const forgotResetSchema = z
  .object({
    resetCode: z.string().min(6, "Reset code must be at least 6 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type ForgotResetValues = z.infer<typeof forgotResetSchema>;

const stats = [
  { value: "12,400+", label: "Students guided", icon: Users },
  { value: "340+", label: "Counseling sessions", icon: BookOpen },
  { value: "91%", label: "Career match rate", icon: TrendingUp },
];

void GOOGLE_CLIENT_ID;

type FormMode = "login" | "forgot-request" | "forgot-reset" | "forgot-success";

export default function Login() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [formVisible, setFormVisible] = useState(true);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  // smooth cross-fade between form modes
  const switchMode = (next: FormMode) => {
    setFormVisible(false);
    setTimeout(() => {
      setFormMode(next);
      setForgotError("");
      setFormVisible(true);
    }, 220);
  };

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const forgotRequestForm = useForm<ForgotRequestValues>({
    resolver: zodResolver(forgotRequestSchema),
    defaultValues: { forgotEmail: "" },
  });

  const forgotResetForm = useForm<ForgotResetValues>({
    resolver: zodResolver(forgotResetSchema),
    defaultValues: { resetCode: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError("");
    setSuccess(false);
    setSubmitting(true);
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
        if (userRole === "admin") window.location.href = "/adminDashboard";
        else if (userRole === "counselor") window.location.href = "/counselorDashboard";
        else window.location.href = "/studentDashboard";
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const onForgotRequest = async (data: ForgotRequestValues) => {
    setForgotLoading(true);
    setForgotError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.forgotEmail }),
      });
      // proceed to code entry whether or not email exists (security best practice)
      setForgotEmail(data.forgotEmail);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        // still move forward — don't reveal if email exists
        console.warn("forgot-password api:", err);
      }
      switchMode("forgot-reset");
    } catch {
      // still move forward for UX
      setForgotEmail(data.forgotEmail);
      switchMode("forgot-reset");
    } finally {
      setForgotLoading(false);
    }
  };

  const onForgotReset = async (data: ForgotResetValues) => {
    setForgotLoading(true);
    setForgotError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, resetCode: data.resetCode, newPassword: data.newPassword }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setForgotError(err.message || "Invalid code or request expired. Please try again.");
      } else {
        switchMode("forgot-success");
      }
    } catch {
      setForgotError("Something went wrong. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-hidden lg:flex-row"
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateX(0)" : "translateX(-32px)",
        transition: "opacity 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <section
        className="relative flex flex-col justify-between overflow-hidden bg-slate-900 p-8 md:p-12 lg:w-[52%]"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 90%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      >
        {/* dot-grid texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* giant decorative letter */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-10 select-none text-[22rem] font-black leading-none text-white"
          style={{ opacity: 0.025 }}
        >
          E
        </span>

        {/* accent rings */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full border border-indigo-500/20"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full border border-indigo-500/10"
        />

        {/* ── top content ── */}
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
              Shape your{" "}
              <span className="relative inline-block text-indigo-400">
                career
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-indigo-500/60" />
              </span>
              <br />
              with expert guidance
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
              Personalized counseling, real-time assessments, and government college pathways — built for J&K students.
            </p>
          </div>

          {/* AI badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Career Matching
          </div>

          {/* stats */}
          <div className="mt-8 flex flex-wrap gap-3">
            {stats.map(({ value, label, icon: Icon }) => (
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

          {/* quote */}
          <blockquote className="mt-10 border-l-2 border-indigo-500 pl-5">
            <p className="text-sm italic leading-relaxed text-slate-400">
              &quot;EduPath helped me discover my strengths and find the right engineering college. It felt like having a
              personal mentor.&quot;
            </p>
            <footer className="mt-2 text-xs font-semibold text-indigo-400">— Aisha R., JEE 2024</footer>
          </blockquote>
        </div>

        {/* ── bottom ── */}
        <div className="relative z-10 mt-12 flex items-center gap-3 text-sm text-slate-500">
          <span>Don&apos;t have an account?</span>
          <Link
            href="/register"
            className="font-semibold text-indigo-400 underline-offset-4 hover:text-indigo-300 hover:underline"
          >
            Create one free
          </Link>
        </div>
      </section>

      {/* ── WAVE DIVIDER ── only on lg+ screens ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-20 hidden lg:block"
        style={{ left: "calc(52% - 48px)", width: "96px" }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 96 900"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* dark left fill — matches bg-slate-900 */}
          <path
            d="M 0 0
               L 48 0
               C 90 75, 96 150, 72 225
               C 48 300, 0 375, 24 450
               C 48 525, 96 600, 72 675
               C 48 750, 0 825, 48 900
               L 0 900
               Z"
            fill="#0f172a"
          />
          {/* white right fill — matches bg-white */}
          <path
            d="M 96 0
               L 48 0
               C 90 75, 96 150, 72 225
               C 48 300, 0 375, 24 450
               C 48 525, 96 600, 72 675
               C 48 750, 0 825, 48 900
               L 96 900
               Z"
            fill="white"
          />
          {/* subtle glow line on the wave */}
          <path
            d="M 48 0
               C 90 75, 96 150, 72 225
               C 48 300, 0 375, 24 450
               C 48 525, 96 600, 72 675
               C 48 750, 0 825, 48 900"
            fill="none"
            stroke="rgba(99,102,241,0.35)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── RIGHT PANEL ── */}
      <section className="flex flex-1 flex-col items-center justify-center bg-white px-6 py-12 md:px-14">
        <div className="w-full max-w-md">

          {/* ── animated content wrapper ── */}
          <div
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.22s ease, transform 0.22s ease",
            }}
          >

            {/* ════════════ LOGIN FORM ════════════ */}
            {formMode === "login" && (
              <>
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Welcome back</p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">Sign in</h2>
                  <p className="mt-1.5 text-sm text-slate-500">Enter your credentials to access your dashboard.</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Email address
                    </label>
                    <Input
                      placeholder="you@example.com"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                      {...form.register("email")}
                    />
                    <span className="mt-1 block text-xs text-rose-500">{form.formState.errors.email?.message}</span>
                  </div>

                  <div>
                    <div className="mb-1.5 flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">Password</label>
                      <button
                        type="button"
                        onClick={() => switchMode("forgot-request")}
                        className="text-xs font-semibold text-indigo-500 hover:text-indigo-600"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pr-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                        {...form.register("password")}
                      />
                      <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <span className="mt-1 block text-xs text-rose-500">{form.formState.errors.password?.message}</span>
                  </div>

                  {error && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                      <Check className="h-4 w-4 flex-none" />
                      <span>Login successful. Redirecting…</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Signing in…" : "Sign in"}
                    {!submitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>

                <div className="mt-8">
                  <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                    Or continue with
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md" aria-label="Sign in with Google">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
                        <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z" />
                        <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z" />
                        <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z" />
                      </svg>
                    </button>
                    <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md" aria-label="Sign in with GitHub">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="currentColor" aria-hidden>
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </button>
                    <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md" aria-label="Sign in with Apple">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-900" fill="currentColor" aria-hidden>
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <p className="mt-10 text-center text-xs text-slate-400">
                  &copy; {new Date().getFullYear()} EduPath &mdash; Jammu & Kashmir Career Guidance Portal
                </p>
              </>
            )}

            {/* ════════════ FORGOT — STEP 1: EMAIL ════════════ */}
            {formMode === "forgot-request" && (
              <>
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to sign in
                </button>
                <div className="mb-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-600/30">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Password recovery</p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">Forgot password?</h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    Enter the email linked to your account and we&apos;ll send you a reset code.
                  </p>
                </div>

                <form onSubmit={forgotRequestForm.handleSubmit(onForgotRequest)} className="space-y-5">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Email address
                    </label>
                    <div className="relative">
                      <Input
                        placeholder="you@example.com"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                        {...forgotRequestForm.register("forgotEmail")}
                      />
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <span className="mt-1 block text-xs text-rose-500">
                      {forgotRequestForm.formState.errors.forgotEmail?.message}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {forgotLoading ? "Sending…" : "Send Reset Code"}
                    {!forgotLoading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>

                <p className="mt-10 text-center text-xs text-slate-400">
                  &copy; {new Date().getFullYear()} EduPath &mdash; Jammu & Kashmir Career Guidance Portal
                </p>
              </>
            )}

            {/* ════════════ FORGOT — STEP 2: RESET CODE + NEW PASSWORD ════════════ */}
            {formMode === "forgot-reset" && (
              <>
                <button
                  type="button"
                  onClick={() => switchMode("forgot-request")}
                  className="mb-6 flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                <div className="mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-500">Check your inbox</p>
                  <h2 className="mt-1 text-3xl font-black text-slate-900">Enter reset code</h2>
                  <p className="mt-1.5 text-sm text-slate-500">
                    We sent a code to <span className="font-semibold text-slate-700">{forgotEmail}</span>. Enter it below with your new password.
                  </p>
                </div>

                <form onSubmit={forgotResetForm.handleSubmit(onForgotReset)} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Reset Code
                    </label>
                    <Input
                      placeholder="Enter 6-digit code"
                      autoComplete="one-time-code"
                      className="h-12 rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500 tracking-widest text-center text-lg font-bold"
                      {...forgotResetForm.register("resetCode")}
                    />
                    <span className="mt-1 block text-xs text-rose-500">
                      {forgotResetForm.formState.errors.resetCode?.message}
                    </span>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      New Password
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Min. 8 characters"
                        autoComplete="new-password"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                        {...forgotResetForm.register("newPassword")}
                      />
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <span className="mt-1 block text-xs text-rose-500">
                      {forgotResetForm.formState.errors.newPassword?.message}
                    </span>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type="password"
                        placeholder="Repeat new password"
                        autoComplete="new-password"
                        className="h-12 rounded-xl border-slate-200 bg-slate-50 pl-10 text-slate-900 placeholder:text-slate-400 focus-visible:ring-indigo-500"
                        {...forgotResetForm.register("confirmPassword")}
                      />
                      <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                    <span className="mt-1 block text-xs text-rose-500">
                      {forgotResetForm.formState.errors.confirmPassword?.message}
                    </span>
                  </div>

                  {forgotError && (
                    <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
                      {forgotError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {forgotLoading ? "Resetting…" : "Reset Password"}
                    {!forgotLoading && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>

                <p className="mt-8 text-center text-xs text-slate-400">
                  &copy; {new Date().getFullYear()} EduPath &mdash; Jammu & Kashmir Career Guidance Portal
                </p>
              </>
            )}

            {/* ════════════ FORGOT — STEP 3: SUCCESS ════════════ */}
            {formMode === "forgot-success" && (
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500">Done!</p>
                <h2 className="mt-1 text-3xl font-black text-slate-900">Password reset</h2>
                <p className="mt-3 text-sm text-slate-500 max-w-xs">
                  Your password has been updated successfully. You can now sign in with your new password.
                </p>
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Back to Sign in <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-8 text-xs text-slate-400">
                  &copy; {new Date().getFullYear()} EduPath &mdash; Jammu & Kashmir Career Guidance Portal
                </p>
              </div>
            )}

          </div>
          {/* ── end animated wrapper ── */}

        </div>
      </section>
    </div>
  );
}
