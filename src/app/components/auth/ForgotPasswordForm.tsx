// "use client";
// import { useState } from "react";
// import { useLocation } from "wouter";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
// import { Input } from "@/app/components/ui/input";
// import { Button } from "@/app/components/ui/button";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import { Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";
// import { apiRequest } from "@/app/lib/queryClient";

// // Form validation schema
// const forgotPasswordSchema = z.object({
//   email: z.string().email("Please enter a valid email address"),
// });

// type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// // Reset password schema for the second step
// const resetPasswordSchema = z.object({
//   resetCode: z.string().min(6, "Reset code must be at least 6 characters"),
//   newPassword: z.string().min(8, "Password must be at least 8 characters"),
//   confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
// }).refine((data) => data.newPassword === data.confirmPassword, {
//   message: "Passwords do not match",
//   path: ["confirmPassword"],
// });

// type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// export default function ForgotPassword() {
//   const [, navigate] = useLocation();
//   const { toast } = useToast();
//   const [step, setStep] = useState<"request" | "reset" | "success">("request");
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Form for requesting password reset
//   const requestForm = useForm<ForgotPasswordFormValues>({
//     resolver: zodResolver(forgotPasswordSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   // Form for resetting password with code
//   const resetForm = useForm<ResetPasswordFormValues>({
//     resolver: zodResolver(resetPasswordSchema),
//     defaultValues: {
//       resetCode: "",
//       newPassword: "",
//       confirmPassword: "",
//     },
//   });

//   async function onRequestSubmit(data: ForgotPasswordFormValues) {
//     setIsLoading(true);
//     try {
//       await apiRequest({
//         method: "POST",
//         path: "/api/auth/forgot-password",
//         body: data,
//       });
      
//       setEmail(data.email);
//       setStep("reset");
//       toast({
//         title: "Reset code sent!",
//         description: "If an account exists with this email, you will receive a password reset code.",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Failed to send reset code",
//         description: "Please try again later.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   async function onResetSubmit(data: ResetPasswordFormValues) {
//     setIsLoading(true);
//     try {
//       await apiRequest({
//         method: "POST",
//         path: "/api/auth/reset-password",
//         body: {
//           email,
//           resetCode: data.resetCode,
//           newPassword: data.newPassword,
//         },
//       });
      
//       setStep("success");
//       toast({
//         title: "Password reset successful!",
//         description: "You can now log in with your new password.",
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Failed to reset password",
//         description: "Please verify your reset code and try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="mb-6">
//           <Button 
//             variant="ghost" 
//             size="sm" 
//             className="text-gray-600 hover:text-gray-900"
//             onClick={() => navigate("/login")}
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Login
//           </Button>
//         </div>

//         {step === "request" && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-2xl">Forgot Password</CardTitle>
//               <CardDescription>
//                 Enter your email and we'll send you a code to reset your password.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...requestForm}>
//                 <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
//                   <FormField
//                     control={requestForm.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                             <Input
//                               placeholder="Enter your email"
//                               className="pl-10"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button 
//                     type="submit" 
//                     className="w-full" 
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Sending..." : "Send Reset Code"}
//                   </Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         )}

//         {step === "reset" && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-2xl">Reset Your Password</CardTitle>
//               <CardDescription>
//                 We've sent a reset code to {email}. Enter the code and your new password below.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...resetForm}>
//                 <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
//                   <FormField
//                     control={resetForm.control}
//                     name="resetCode"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Reset Code</FormLabel>
//                         <FormControl>
//                           <Input
//                             placeholder="Enter reset code"
//                             {...field}
//                           />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={resetForm.control}
//                     name="newPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>New Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                             <Input
//                               type="password"
//                               placeholder="Enter new password"
//                               className="pl-10"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={resetForm.control}
//                     name="confirmPassword"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Confirm Password</FormLabel>
//                         <FormControl>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                             <Input
//                               type="password"
//                               placeholder="Confirm new password"
//                               className="pl-10"
//                               {...field}
//                             />
//                           </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <Button 
//                     type="submit" 
//                     className="w-full" 
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Resetting..." : "Reset Password"}
//                   </Button>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         )}

//         {step === "success" && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-2xl">Password Reset Successful</CardTitle>
//             </CardHeader>
//             <CardContent className="text-center">
//               <div className="flex justify-center mb-4">
//                 <CheckCircle2 className="h-16 w-16 text-green-500" />
//               </div>
//               <p className="mb-6">Your password has been successfully reset.</p>
//               <Button 
//                 className="w-full" 
//                 onClick={() => navigate("/login")}
//               >
//                 Back to Login
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }