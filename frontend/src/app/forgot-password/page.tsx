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

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/forgot-password`, {
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
            <p className="text-gray-600 text-lg">No worries, we'll send you reset instructions</p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#eb1c23]/5 to-[#7b1c11]/5 pb-6">
              <CardTitle className="text-2xl text-gray-900">Reset Password</CardTitle>
              <CardDescription className="text-gray-600">
                {isSuccess ? "Check your email for the reset link" : "Enter your email address and we'll send you a link to reset your password"}
                <br />
                <span className="text-xs text-gray-500 mt-2 inline-block">
                  📧 Reset links will be sent from: <strong>no-reply@masalamoves.co.uk</strong>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                    <p className="text-green-800 text-center">
                      ✉️ We've sent a password reset link to <strong>{email}</strong>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-blue-800 text-sm text-center">
                      📧 <strong>Sender:</strong> no-reply@masalamoves.co.uk
                      <br />
                      <span className="text-xs">Please check your inbox and spam folder</span>
                    </p>
                  </div>
                  <div className="text-center text-sm text-gray-600">
                    <p className="mb-4">Didn't receive the email? Check your spam folder or try again.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsSuccess(false);
                        setEmail("");
                      }}
                      className="w-full"
                    >
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
