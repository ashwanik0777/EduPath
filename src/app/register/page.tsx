"use client";
 import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Progress } from "@/app/components/ui/progress";
import {
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowRight,
  BookOpen,
  BarChart,
  Loader2,
  UserPlus,
  CheckCircle2,
  Brain
} from "lucide-react";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  academicLevel: z.enum([
    "elementary", 
    "middle_school", 
    "high_school", 
    "undergraduate", 
    "graduate", 
    "postgraduate"
  ], {
    required_error: "Please select your academic level",
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const totalSteps = 2;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
      academicLevel: undefined,
    },
    mode: "onChange",
  });

  const validateStep1 = () => {
    const { fullName, email, password } = form.getValues();
    const isValid = fullName.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;
    if (isValid) {
      setStep(2);
    } else {
      form.trigger(["fullName", "email", "password"]);
    }
  };

  const onSubmit = async (data: RegisterFormValues) => {
    setError("");
    setLoading(true);
    try {
      // Simulate backend registration delay
      await new Promise((res) => setTimeout(res, 1500));
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 to-indigo-900 p-6">
        <div className="max-w-md w-full bg-indigo-800 rounded-xl shadow-xl p-8 text-center text-white">
          <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-400" />
          <h2 className="text-3xl font-bold mb-2">Registration Successful!</h2>
          <p className="mb-6">Welcome to EduPath. You can now <Link href="/login" className="underline text-amber-400">log in</Link>.</p>
          <Button className="btn-3d w-full" onClick={() => setSuccess(false)}>Register Another</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-7/12 lg:w-1/2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 md:p-8 lg:p-12 flex items-center justify-center relative">
        {/* Background blobs and floating objects as in your original code */}
        {/* ... */}
        <div className="w-full max-w-md mt-16 md:mt-0">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">Join Our Learning Community</h2>
            <p className="text-indigo-300 text-sm">
              Create your account to start your personalized learning journey
            </p>
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-indigo-300 font-medium">Step {step} of {totalSteps}</span>
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-900/60 to-indigo-800/60 text-amber-300 font-medium shadow-inner">
                {step === 1 ? "Account Info" : "Academic Profile"}
              </div>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-3 rounded-full bg-indigo-900/60 overflow-hidden" />
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {step === 1 && (
                <>
                  <FormField control={form.control} name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200 flex items-center">
                          <User className="h-4 w-4 mr-2 opacity-70" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your full name" className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )} />
                  <FormField control={form.control} name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200 flex items-center">
                          <Mail className="h-4 w-4 mr-2 opacity-70" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter your email" type="email" className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )} />
                  <FormField control={form.control} name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200 flex items-center">
                          <Lock className="h-4 w-4 mr-2 opacity-70" /> Password
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Create a password (min. 6 characters)" type="password" className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )} />
                  <Button type="button" className="w-full h-12 rounded-lg text-base font-medium bg-gradient-to-r from-amber-300 to-amber-400 text-indigo-950 btn-3d" onClick={validateStep1}>
                    Continue <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <FormField control={form.control} name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200 flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 opacity-70" /> Username
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Choose a username" className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500" />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <FormField control={form.control} name="academicLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200 flex items-center">
                          <BarChart className="h-4 w-4 mr-2 opacity-70" /> Academic Level
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500">
                              <SelectValue placeholder="Select your academic level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-indigo-900 border-indigo-700 text-indigo-200">
                            <SelectItem value="elementary">Elementary School</SelectItem>
                            <SelectItem value="middle_school">Middle School</SelectItem>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="undergraduate">University - Undergraduate</SelectItem>
                            <SelectItem value="graduate">University - Graduate</SelectItem>
                            <SelectItem value="postgraduate">Post-Graduation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <div className="flex flex-col space-y-3 pt-2">
                    <Button type="submit" className="w-full h-12 rounded-lg text-base font-medium bg-gradient-to-r from-amber-300 to-amber-400 text-indigo-950 btn-3d flex items-center justify-center" disabled={loading}>
                      {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Creating account...</> : (<><UserPlus className="mr-2 h-5 w-5" />Create Account</>)}
                    </Button>
                    <Button type="button" variant="outline" className="w-full h-12 rounded-lg text-base font-medium border-indigo-700 text-indigo-200 hover:bg-indigo-900/80 btn-3d" onClick={() => setStep(1)}>
                      Back
                    </Button>
                  </div>
                  {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg text-sm flex items-start mt-4 animate-pulse-glow">
                      <div className="mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span>{error}</span>
                    </div>
                  )}
                </>
              )}
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-gradient-to-br from-amber-300 to-amber-400 flex-col justify-center p-8 relative overflow-hidden">
        {/* Background blobs & floating shapes */}
        <div className="blob-animation absolute top-[15%] left-[20%] w-64 h-64 bg-cyan-500/30 rounded-full"></div>
        <div className="blob-animation absolute bottom-[10%] right-[20%] w-80 h-80 bg-amber-200/50 rounded-full animation-delay-2000"></div>
        <div className="absolute top-[10%] left-[15%] w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg transform rotate-12 animate-float-3d opacity-80 shadow-xl"></div>
        <div className="absolute top-[20%] right-[20%] w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg transform -rotate-12 animate-float-3d animation-delay-2000 opacity-80 shadow-xl"></div>
        <div className="absolute bottom-[20%] left-[30%] w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-lg transform rotate-45 animate-float-3d animation-delay-3000 opacity-80 shadow-xl"></div>
        <div className="absolute bottom-[30%] right-[10%] w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded transform -rotate-12 animate-float-3d animation-delay-1500 opacity-60 shadow-xl"></div>
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex items-center mb-12 glow-effect">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 rounded-xl mr-3 shadow-lg transition-transform duration-300 hover:scale-105">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-indigo-800 drop-shadow-md">EduPath</h1>
              <p className="text-sm text-indigo-700">LEARNING PLATFORM</p>
            </div>
          </div>
          <div className="mb-16 transition-transform duration-500 hover:translate-x-2">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 drop-shadow-md">
              Get Started Today
            </h2>
            <p className="text-indigo-700 text-lg mb-8">
              Join thousands of students unlocking their full potential with personalized AI-powered learning
            </p>
            <Link href="/login">
              <Button variant="outline" className="h-12 px-6 bg-white/80 hover:bg-white text-indigo-800 border-indigo-300 hover:border-indigo-500 font-medium rounded-lg w-40 shadow-md btn-3d">
                SIGN IN NOW
              </Button>
            </Link>
          </div>
          <div className="space-y-6 mb-8">
            <div className="flex items-center gap-4 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-center w-14 h-14 bg-indigo-600/20 backdrop-blur-sm rounded-full">
                <Brain className="h-7 w-7 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">AI-Powered Learning</h3>
                <p className="text-sm text-indigo-700">Personalized study plans that adapt to your learning style</p>
              </div>
            </div>
            <div className="flex items-center gap-4 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-center w-14 h-14 bg-amber-500/20 backdrop-blur-sm rounded-full">
                <BarChart className="h-7 w-7 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">Progress Analytics</h3>
                <p className="text-sm text-indigo-700">Track your learning journey with detailed data insights</p>
              </div>
            </div>
            <div className="flex items-center gap-4 transition-transform duration-500 hover:-translate-y-1">
              <div className="flex items-center justify-center w-14 h-14 bg-cyan-500/20 backdrop-blur-sm rounded-full">
                <CheckCircle2 className="h-7 w-7 text-indigo-700" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-indigo-800">Smart Recommendations</h3>
                <p className="text-sm text-indigo-700">Data-driven suggestions based on your learning patterns</p>
              </div>
            </div>
          </div>
          <div className="text-indigo-800 text-sm mt-auto">&copy;2025 EduPath</div>
        </div>
      </div>
    </div>
  );
}
