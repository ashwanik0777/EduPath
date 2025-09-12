// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useAuth } from "@/context/AuthContext";

// import { Button } from "@/app/components/ui/button";
// import { Input } from "@/app/components/ui/input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/app/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/app/components/ui/select";
// import { 
//   Loader2, 
//   GraduationCap, 
//   User, 
//   Mail, 
//   Lock, 
//   ArrowRight, 
//   CheckCircle2, 
//   BookOpen, 
//   BarChart, 
//   Brain,
//   UserPlus,
//   LineChart,
//   Sparkles
// } from "lucide-react";
// import { Progress } from "@/app/components/ui/progress";

// // Registration form schema with validation
// const registerSchema = z.object({
//   username: z.string().min(3, "Username must be at least 3 characters"),
//   email: z.string().email("Please enter a valid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   fullName: z.string().min(2, "Full name must be at least 2 characters"),
//   academicLevel: z.enum([
//     "elementary", 
//     "middle_school", 
//     "high_school", 
//     "undergraduate", 
//     "graduate", 
//     "postgraduate"
//   ], {
//     required_error: "Please select your academic level",
//   }),
// });

// type RegisterFormValues = z.infer<typeof registerSchema>;

// export default function Register() {
//   const { register, loading } = useAuth();
//   const [error, setError] = useState("");
//   const [step, setStep] = useState(1);
//   const totalSteps = 2;
  
//   // Initialize form with react-hook-form
//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(registerSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//       fullName: "",
//       academicLevel: undefined,
//     },
//     mode: "onChange"
//   });
  
//   // Form step validation helpers
//   const validateStep1 = () => {
//     const { fullName, email, password } = form.getValues();
//     const isValid = 
//       fullName.length >= 2 && 
//       /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && 
//       password.length >= 6;
    
//     if (isValid) {
//       setStep(2);
//     } else {
//       form.trigger(["fullName", "email", "password"]);
//     }
//   };

//   // Form submission handler
//   const onSubmit = async (data: RegisterFormValues) => {
//     setError("");
//     try {
//       await register(data);
//     } catch (err: any) {
//       setError(err.message || "Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen">
//       {/* Left section - Form (Dark panel) */}
//       <div className="w-full md:w-7/12 lg:w-1/2 bg-gradient-to-br from-indigo-950 to-indigo-900 p-6 md:p-8 lg:p-12 flex items-center justify-center relative">
//         {/* Divider line on the right side */}
//         <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-300/10 via-amber-400/30 to-amber-300/10"></div>
//         {/* Background animated elements */}
//         <div className="blob-animation absolute top-[20%] right-[30%] w-96 h-96 bg-indigo-600/10 rounded-full"></div>
//         <div className="blob-animation absolute bottom-[10%] left-[20%] w-72 h-72 bg-amber-400/5 rounded-full animation-delay-3000"></div>
        
//         {/* Enhanced 3D floating objects */}
//         <div className="absolute top-[5%] right-[10%] w-14 h-14 bg-indigo-600/20 rounded-xl transform rotate-12 animate-float-3d opacity-60 shadow-lg"></div>
//         <div className="absolute bottom-[10%] left-[10%] w-12 h-12 bg-cyan-500/20 rounded-xl transform -rotate-12 animate-float-3d animation-delay-2000 opacity-60 shadow-lg"></div>
//         <div className="absolute top-[20%] left-[5%] w-10 h-10 bg-white/5 rounded-xl transform rotate-45 animate-float-3d animation-delay-1000 opacity-60 shadow-lg"></div>
        
//         {/* Mobile only - Brand header */}
//         <div className="md:hidden absolute top-6 left-6 right-6 flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-lg mr-2 shadow-md">
//               <GraduationCap className="h-6 w-6 text-white" />
//             </div>
//             <span className="text-xl font-bold text-white drop-shadow-sm">LEARNAI</span>
//           </div>
//           <Button 
//             variant="ghost" 
//             className="p-2 text-white hover:bg-indigo-800/50 btn-3d"
//             asChild
//           >
//             <Link href="/login">Login</Link>
//           </Button>
//         </div>
        
//         <div className="w-full max-w-md mt-16 md:mt-0">
//           <div className="mb-8 text-center md:text-left">
//             <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-md">Join Our Learning Community</h2>
//             <p className="text-indigo-300 text-sm">
//               Create your account to start your personalized learning journey
//             </p>
//           </div>
          
//           {/* Enhanced Progress indicator */}
//           <div className="mb-8">
//             <div className="flex justify-between items-center text-sm mb-2">
//               <span className="text-indigo-300 font-medium">Step {step} of {totalSteps}</span>
//               <div className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-900/60 to-indigo-800/60 text-amber-300 font-medium shadow-inner">
//                 {step === 1 ? 'Account Info' : 'Academic Profile'}
//               </div>
//             </div>
//             <div className="relative">
//               <Progress value={(step / totalSteps) * 100} className="h-3 rounded-full bg-indigo-900/60 overflow-hidden" />
//               <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-300 to-transparent blur-sm"></div>
//               <div className="absolute top-0 left-0 right-0 flex justify-between px-1">
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transform transition-all duration-500 ${step >= 1 ? 'bg-gradient-to-br from-amber-300 to-amber-400 text-indigo-900 scale-110 shadow-lg' : 'bg-indigo-800 text-indigo-400'}`}>1</div>
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transform transition-all duration-500 ${step >= 2 ? 'bg-gradient-to-br from-amber-300 to-amber-400 text-indigo-900 scale-110 shadow-lg' : 'bg-indigo-800 text-indigo-400'}`}>2</div>
//               </div>
//             </div>
//           </div>
          
//           <div className="glass p-6 rounded-xl shadow-2xl border border-indigo-800/50 mb-6 transform transition-all duration-300 hover:shadow-indigo-700/10">
//             <Form {...form}>
//               <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
//                 {step === 1 && (
//                   <>
//                     <FormField
//                       control={form.control}
//                       name="fullName"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-indigo-200 flex items-center">
//                             <User className="h-4 w-4 mr-2 opacity-70" />
//                             Full Name
//                           </FormLabel>
//                           <FormControl>
//                             <div className="relative group">
//                               <Input 
//                                 placeholder="Enter your full name" 
//                                 className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300" 
//                                 {...field} 
//                               />
//                               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"></div>
//                             </div>
//                           </FormControl>
//                           <FormMessage className="text-red-400" />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-indigo-200 flex items-center">
//                             <Mail className="h-4 w-4 mr-2 opacity-70" />
//                             Email
//                           </FormLabel>
//                           <FormControl>
//                             <div className="relative group">
//                               <Input 
//                                 type="email" 
//                                 placeholder="Enter your email" 
//                                 className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300" 
//                                 {...field} 
//                               />
//                               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"></div>
//                             </div>
//                           </FormControl>
//                           <FormMessage className="text-red-400" />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="password"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-indigo-200 flex items-center">
//                             <Lock className="h-4 w-4 mr-2 opacity-70" />
//                             Password
//                           </FormLabel>
//                           <FormControl>
//                             <div className="relative group">
//                               <Input 
//                                 type="password" 
//                                 placeholder="Create a password (min. 6 characters)" 
//                                 className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300" 
//                                 {...field} 
//                               />
//                               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"></div>
//                             </div>
//                           </FormControl>
//                           <FormMessage className="text-red-400" />
//                         </FormItem>
//                       )}
//                     />
                    
//                     <Button 
//                       type="button" 
//                       className="w-full h-12 rounded-lg text-base font-medium bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-indigo-950 transition-all duration-300 shadow-md btn-3d"
//                       onClick={validateStep1}
//                     >
//                       Continue
//                       <ArrowRight className="ml-2 h-5 w-5" />
//                     </Button>
//                   </>
//                 )}
                
//                 {step === 2 && (
//                   <>
//                     <FormField
//                       control={form.control}
//                       name="username"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-indigo-200 flex items-center">
//                             <BookOpen className="h-4 w-4 mr-2 opacity-70" />
//                             Username
//                           </FormLabel>
//                           <FormControl>
//                             <div className="relative group">
//                               <Input 
//                                 placeholder="Choose a username" 
//                                 className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300" 
//                                 {...field} 
//                               />
//                               <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-md"></div>
//                             </div>
//                           </FormControl>
//                           <FormMessage className="text-red-400" />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="academicLevel"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-indigo-200 flex items-center">
//                             <BarChart className="h-4 w-4 mr-2 opacity-70" />
//                             Academic Level
//                           </FormLabel>
//                           <Select onValueChange={field.onChange} defaultValue={field.value}>
//                             <FormControl>
//                               <SelectTrigger className="h-12 bg-indigo-900/40 border-indigo-700 placeholder-indigo-400 text-white rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-300">
//                                 <SelectValue placeholder="Select your academic level" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent className="bg-indigo-900 border-indigo-700 text-indigo-200">
//                               <SelectItem value="elementary">Elementary School</SelectItem>
//                               <SelectItem value="middle_school">Middle School</SelectItem>
//                               <SelectItem value="high_school">High School</SelectItem>
//                               <SelectItem value="undergraduate">University - Undergraduate</SelectItem>
//                               <SelectItem value="graduate">University - Graduate</SelectItem>
//                               <SelectItem value="postgraduate">Post-Graduation</SelectItem>
//                             </SelectContent>
//                           </Select>
//                           <FormMessage className="text-red-400" />
//                         </FormItem>
//                       )}
//                     />

//                     <div className="flex flex-col space-y-3 pt-2">
//                       <Button 
//                         type="submit" 
//                         className="w-full h-12 rounded-lg text-base font-medium bg-gradient-to-r from-amber-300 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-indigo-950 transition-all duration-300 shadow-md btn-3d flex items-center justify-center"
//                         disabled={loading}
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                             Creating account...
//                           </>
//                         ) : (
//                           <>
//                             <UserPlus className="mr-2 h-5 w-5" />
//                             Create Account
//                           </>
//                         )}
//                       </Button>
                      
//                       <Button 
//                         type="button" 
//                         variant="outline" 
//                         className="w-full h-12 rounded-lg text-base font-medium border-indigo-700 text-indigo-200 hover:bg-indigo-900/80 transition-all duration-300 btn-3d"
//                         onClick={() => setStep(1)}
//                       >
//                         Back
//                       </Button>
//                     </div>
                    
//                     {error && (
//                       <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-lg text-sm flex items-start mt-4 animate-pulse-glow">
//                         <div className="mr-2 mt-0.5">
//                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </div>
//                         <span>{error}</span>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </form>
//             </Form>
//           </div>
          
//           {/* Mobile only - Create account link */}
//           <div className="md:hidden text-center mt-8">
//             <p className="text-indigo-300">
//               Already have an account?{" "}
//               <Link href="/login" className="text-gradient bg-gradient-to-r from-amber-300 to-amber-500 font-medium hover:from-amber-400 hover:to-amber-600 transition-all duration-300">
//                 Sign in
//               </Link>
//             </p>
//           </div>
          
//           {/* Desktop - Footer links */}
//           <div className="hidden md:flex flex-col items-center mt-10">
//             <div className="mb-4 text-center text-indigo-300 text-xs">
//               <p>By creating an account, you agree to our data privacy practices</p>
//               <p className="mt-1">Your learning data will be used to personalize your experience</p>
//             </div>
//             <div className="flex space-x-6 text-xs text-indigo-400 mt-2">
//               <Link href="/terms" className="hover:text-indigo-300 transition-colors duration-300">Terms & Conditions</Link>
//               <Link href="/privacy" className="hover:text-indigo-300 transition-colors duration-300">Privacy Policy</Link>
//               <Link href="/help" className="hover:text-indigo-300 transition-colors duration-300">Help Center</Link>
//               <Link href="/faq" className="hover:text-indigo-300 transition-colors duration-300">FAQ</Link>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Right section - Brand and Welcome (Yellow section) */}
//       <div className="hidden md:flex md:w-5/12 lg:w-1/2 bg-gradient-to-br from-amber-300 to-amber-400 flex-col justify-center p-8 relative overflow-hidden">
//         {/* Morphing blobs in background */}
//         <div className="blob-animation absolute top-[15%] left-[20%] w-64 h-64 bg-cyan-500/30 rounded-full"></div>
//         <div className="blob-animation absolute bottom-[10%] right-[20%] w-80 h-80 bg-amber-200/50 rounded-full animation-delay-2000"></div>
        
//         {/* Enhanced 3D floating objects */}
//         <div className="absolute top-[10%] left-[15%] w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg transform rotate-12 animate-float-3d opacity-80 shadow-xl"></div>
//         <div className="absolute top-[20%] right-[20%] w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg transform -rotate-12 animate-float-3d animation-delay-2000 opacity-80 shadow-xl"></div>
//         <div className="absolute bottom-[20%] left-[30%] w-12 h-12 bg-gradient-to-br from-white to-gray-100 rounded-lg transform rotate-45 animate-float-3d animation-delay-3000 opacity-80 shadow-xl"></div>
//         <div className="absolute bottom-[30%] right-[10%] w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded transform -rotate-12 animate-float-3d animation-delay-1500 opacity-60 shadow-xl"></div>
        
//         <div className="relative z-10 max-w-md mx-auto">
//           {/* Logo and Brand with glow effect */}
//           <div className="flex items-center mb-12 glow-effect">
//             <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-3 rounded-xl mr-3 shadow-lg transform transition-all duration-300 hover:scale-105">
//               <GraduationCap className="h-8 w-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-indigo-800 drop-shadow-md">LEARNAI</h1>
//               <p className="text-sm text-indigo-700">LEARNING PLATFORM</p>
//             </div>
//           </div>
          
//           <div className="mb-16 transform transition-all duration-500 hover:translate-x-2">
//             <h2 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6 drop-shadow-md">
//               Get Started Today
//             </h2>
//             <p className="text-indigo-700 text-lg mb-8">
//               Join thousands of students unlocking their full potential with personalized AI-powered learning
//             </p>
//             <Link href="/login">
//               <Button 
//                 variant="outline"
//                 className="h-12 px-6 bg-white/80 hover:bg-white text-indigo-800 border-indigo-300 hover:border-indigo-500 font-medium rounded-lg w-40 shadow-md btn-3d"
//               >
//                 SIGN IN NOW
//               </Button>
//             </Link>
//           </div>
          
//           <div className="space-y-6 mb-8">
//             <div className="relative flex items-center gap-4 transform transition-all duration-500 hover:-translate-y-1">
//               <div className="flex items-center justify-center w-14 h-14 bg-indigo-600/20 backdrop-blur-sm rounded-full">
//                 <Brain className="h-7 w-7 text-indigo-700" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-indigo-800">AI-Powered Learning</h3>
//                 <p className="text-sm text-indigo-700">Personalized study plans that adapt to your learning style</p>
//               </div>
//             </div>

//             <div className="relative flex items-center gap-4 transform transition-all duration-500 hover:-translate-y-1">
//               <div className="flex items-center justify-center w-14 h-14 bg-amber-500/20 backdrop-blur-sm rounded-full">
//                 <BarChart className="h-7 w-7 text-indigo-700" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-indigo-800">Progress Analytics</h3>
//                 <p className="text-sm text-indigo-700">Track your learning journey with detailed data insights</p>
//               </div>
//             </div>

//             <div className="relative flex items-center gap-4 transform transition-all duration-500 hover:-translate-y-1">
//               <div className="flex items-center justify-center w-14 h-14 bg-cyan-500/20 backdrop-blur-sm rounded-full">
//                 <CheckCircle2 className="h-7 w-7 text-indigo-700" />
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold text-indigo-800">Smart Recommendations</h3>
//                 <p className="text-sm text-indigo-700">Data-driven suggestions based on your learning patterns</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-indigo-800 text-sm mt-auto">
//             &copy;2025 LearnAI
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
