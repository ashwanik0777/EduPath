"use client";
import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Progress } from "@/app/components/ui/progress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Loader2,
  GraduationCap,
  User,
  Mail,
  Lock,
  ArrowRight,
  UserPlus,
  BookOpen,
  BarChart,
  Calendar,
  Sparkles,
  Users,
  Heart,
  Star,
  CheckCircle2,
  Brain
} from "lucide-react";

// Registration schema - now with DOB and Gender
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
    message: "Please select your academic level",
  }),
  dob: z
    .string()
    .refine(str => /^\d{4}-\d{2}-\d{2}$/.test(str), { message: "Please enter a valid date" })
    .refine(str => {
      const dob = new Date(str);
      const now = new Date();
      const minAge = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate()); // min 5 years old
      return dob < minAge;
    }, { message: "Must be at least 5 years old" }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select your gender"
  }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function Register() {
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [registered, setRegistered] = useState(false);
  const totalSteps = 2;

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
    mode: "onChange"
  });

  // Step validation helper
  const validateStep1 = () => {
    const { fullName, email, password } = form.getValues();
    const isValid =
      fullName.length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      password.length >= 6;
    if (isValid) {
      setStep(2);
    } else {
      form.trigger(["fullName", "email", "password"]);
    }
  };

  // Pure frontend-only submission
  const onSubmit = (values: RegisterFormValues) => {
    setError("");
    setRegistered(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Form Panel */}
      <div className="w-full md:w-7/12 lg:w-1/2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 md:p-8 lg:p-12 flex items-center justify-center relative">
        <div className="w-full max-w-md mt-16 md:mt-0">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">
              Join Our Learning Community
            </h2>
            <p className="text-indigo-300 text-sm">
              Create your account to start your personalized learning journey
            </p>
          </div>
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-indigo-300 font-medium">Step {step} of {totalSteps}</span>
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-900/60 to-indigo-800/60 text-amber-300 font-medium shadow-inner">
                {step === 1 ? 'Account Info' : 'Academic Profile'}
              </span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-3 rounded-full bg-indigo-900/60 overflow-hidden" />
          </div>

          {/* Registration Form */}
          {registered ? (
            <div className="flex flex-col items-center py-12">
              <CheckCircle2 className="text-green-400 w-16 h-16 mb-4" />
              <div className="text-xl text-indigo-200 font-bold">Registration Successful!</div>
              <div className="mt-2 text-indigo-400">Welcome to LearnAI. You can now <Link href="/login" className="underline text-amber-300">Sign In</Link>.</div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {step === 1 && (
                  <>
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <User className="h-4 w-4 mr-2 opacity-70" /> Full Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              autoComplete="off"
                              className="h-12 bg-indigo-900/40 border-indigo-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <Mail className="h-4 w-4 mr-2 opacity-70" /> Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              autoComplete="off"
                              className="h-12 bg-indigo-900/40 border-indigo-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <Lock className="h-4 w-4 mr-2 opacity-70" /> Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Create a password (min. 6 characters)"
                              className="h-12 bg-indigo-900/40 border-indigo-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      className="w-full h-12 rounded-lg font-medium bg-gradient-to-r from-amber-300 to-amber-400 text-indigo-950 btn-3d"
                      onClick={validateStep1}
                    >
                      Continue <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 opacity-70" /> Username
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Choose a username"
                              autoComplete="off"
                              className="h-12 bg-indigo-900/40 border-indigo-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="academicLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <BarChart className="h-4 w-4 mr-2 opacity-70" /> Academic Level
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-indigo-900/40 border-indigo-700 text-white">
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
                    {/* DOB */}
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <Calendar className="h-4 w-4 mr-2 opacity-70" /> Date of Birth
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              max={new Date().toISOString().split("T")[0]}
                              className="h-12 bg-indigo-900/40 border-indigo-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    {/* Gender - Inclusive, accessible radio group */}
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200 flex items-center">
                            <Sparkles className="h-4 w-4 mr-2 opacity-70" /> Gender
                          </FormLabel>
                          <FormControl>
                            <div className="flex gap-5 mt-2">
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  value="male"
                                  checked={field.value === "male"}
                                  onChange={() => field.onChange("male")}
                                  className="accent-indigo-600"
                                />
                                <Users className="h-4 w-4" /> <span>Male</span>
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  value="female"
                                  checked={field.value === "female"}
                                  onChange={() => field.onChange("female")}
                                  className="accent-pink-500"
                                />
                                <Heart className="h-4 w-4" /> <span>Female</span>
                              </label>
                              <label className="flex items-center gap-1">
                                <input
                                  type="radio"
                                  value="other"
                                  checked={field.value === "other"}
                                  onChange={() => field.onChange("other")}
                                  className="accent-teal-400"
                                />
                                <Star className="h-4 w-4" /> <span>Other</span>
                              </label>
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col space-y-3 pt-2">
                      <Button
                        type="submit"
                        className="w-full h-12 rounded-lg font-medium bg-gradient-to-r from-amber-300 to-amber-400 text-indigo-950 btn-3d flex items-center justify-center"
                      >
                        <UserPlus className="mr-2 h-5 w-5" />
                        Create Account
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full h-12 rounded-lg border-indigo-700 text-indigo-200 hover:bg-indigo-900/80 btn-3d"
                        onClick={() => setStep(1)}
                      >
                        Back
                      </Button>
                    </div>
                    {error && (
                      <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg text-sm mt-4">
                        {error}
                      </div>
                    )}
                  </>
                )}
              </form>
            </Form>
          )}
          {/* Links and Footer below as in your code */}
        </div>
      </div>
      {/* Branding Panel (unchanged, use your previous JSX) */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-gradient-to-br from-amber-300 to-amber-400 flex-col justify-center p-8 relative overflow-hidden">
        {/* ...branding JSX unchanged */}
      </div>
    </div>
  );
}
