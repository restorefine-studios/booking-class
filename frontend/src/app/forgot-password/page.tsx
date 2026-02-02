"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { toast } from "@/lib/toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("🔐 Forgot password request for:", email);

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/custom-auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to send reset email");
      }

      console.log("✅ Forgot password request successful");
      setIsSuccess(true);
      toast.success("Password reset email sent! Please check your inbox.");
    } catch (error) {
      console.error("❌ Forgot password error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-[#eb1c23]/10 to-[#7b1c11]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-gradient-to-br from-bollywood-pink/10 to-saffron/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-xl">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900">
              Forgot <span className="text-gradient">Password?</span>
            </h1>
            <p className="text-gray-600 text-lg">No worries, we&apos;ll send you reset instructions</p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#eb1c23]/5 to-[#7b1c11]/5 pb-6">
              <CardTitle className="text-2xl text-gray-900">Reset Password</CardTitle>
              <CardDescription className="text-gray-600">
                {isSuccess ? "Check your email for the reset link" : "Enter your email address and we&apos;ll send you a link to reset your password"}
                <br />
                <span className="text-xs text-gray-500 mt-2 inline-block">
                  📧 Reset links will be sent from: <strong>no-reply@masalamoves.co.uk</strong>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="space-y-6 py-2">
                  {/* Success Message with Icon */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-4 shadow-lg">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Check Your Email!</h3>
                    <p className="text-gray-600">We&apos;ve sent a password reset link to</p>
                    <p className="text-[#eb1c23] font-semibold text-lg mt-1">{email}</p>
                  </div>

                  {/* Email Details Card */}
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900 mb-1">Email sent from:</p>
                          <p className="text-blue-700 font-mono text-sm">no-reply@masalamoves.co.uk</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-blue-200/50">
                        <p className="text-xs text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Please check your inbox and spam folder
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <p className="text-center text-sm text-gray-600 mb-3">Didn&apos;t receive the email?</p>
                    <Button
                      onClick={() => {
                        setIsSuccess(false);
                        setEmail("");
                      }}
                      className="w-full bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-[#eb1c23] font-semibold shadow-sm hover:shadow transition-all duration-300"
                      size="lg"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Try another email
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your.email@example.com" disabled={isLoading} />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center">
                <Link href="/login" className="inline-flex items-center text-sm text-[#eb1c23] hover:text-[#7b1c11] font-semibold transition-colors">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Login
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link href="/classes" className="text-sm text-gray-600 hover:text-[#eb1c23] transition-colors font-medium">
              ← Back to Classes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
