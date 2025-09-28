"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { useToast } from "@/app/hooks/use-toast";
import { Mail, Lock, ArrowLeft, CheckCircle2 } from "lucide-react";

// Form validation schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Reset password schema for second step
const resetPasswordSchema = z.object({
  resetCode: z.string().min(6, "Reset code must be at least 6 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<"request" | "reset" | "success">("request");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Form 1 (request code) - Must be called before any conditional returns
  const requestForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  // Form 2 (reset password) - Must be called before any conditional returns
  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { resetCode: "", newPassword: "", confirmPassword: "" },
  });

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  // Simulate an email reset code send (frontend only)
  const onRequestSubmit = (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setEmail(data.email);
      setStep("reset");
      setIsLoading(false);
      toast({
        title: "Reset code sent!",
        description: "Demo: A reset code was sent to your email.",
      });
    }, 1000);
  };

  // Simulate password reset (frontend only)
  const onResetSubmit = (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setStep("success");
      setIsLoading(false);
      toast({
        title: "Password reset successful!",
        description: "You can now log in with your new password.",
      });
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-gray-900"
            onClick={() => router.push("/login")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </div>

        {step === "request" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email and we'll send you a code to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...requestForm}>
                <form onSubmit={requestForm.handleSubmit(onRequestSubmit)} className="space-y-4">
                  <FormField
                    control={requestForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              placeholder="Enter your email"
                              className="pl-10"
                              {...field}
                              autoComplete="off"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Reset Code"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === "reset" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription>
                We've sent a reset code to <b>{email}</b>. Enter the code and your new password below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-4">
                  <FormField
                    control={resetForm.control}
                    name="resetCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reset Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter reset code"
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="password"
                              placeholder="Enter new password"
                              className="pl-10"
                              {...field}
                              autoComplete="new-password"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={resetForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              type="password"
                              placeholder="Confirm new password"
                              className="pl-10"
                              {...field}
                              autoComplete="new-password"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {step === "success" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Password Reset Successful</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <p className="mb-6">Your password has been reset (demo only).</p>
              <Button 
                className="w-full" 
                onClick={() => router.push("/login")}
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
