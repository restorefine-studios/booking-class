"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRegister } from "@/hooks/use-auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    hearAboutUs: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const userData = {
      username: formData.email,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      address: formData.address,
      hearAboutUs: formData.hearAboutUs,
    };

    console.log("📤 Sending registration data:", userData);

    registerMutation.mutate(userData, {
      onSuccess: () => {
        // Registration successful - user is now authenticated, redirect to home page
        // Use replace() instead of push() to prevent back button issues
        router.replace("/");
      },
      onError: (error: Error) => {
        setError(error.message);
      },
    });
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-gradient-to-br from-[#eb1c23]/10 to-[#7b1c11]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-gradient-to-br from-bollywood-pink/10 to-saffron/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-saffron/10 to-bollywood-gold/10 rounded-full blur-2xl"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-xl transform -rotate-6">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900">
              Join <span className="text-gradient">Masala Moves</span>
            </h1>
            <p className="text-gray-600 text-lg">Create your account and start your dance journey</p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-[#eb1c23]/5 to-[#7b1c11]/5 pb-6">
              <CardTitle className="text-2xl text-gray-900">Sign Up</CardTitle>
              <CardDescription className="text-gray-600">Fill in your details to create an account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} required placeholder="John" disabled={registerMutation.isPending} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} required placeholder="Doe" disabled={registerMutation.isPending} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="john.doe@example.com" disabled={registerMutation.isPending} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+44 123 456 7890" disabled={registerMutation.isPending} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" type="text" value={formData.address} onChange={handleInputChange} required placeholder="123 Main Street, London, UK" disabled={registerMutation.isPending} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
                  <Select value={formData.hearAboutUs} onValueChange={(value) => handleSelectChange("hearAboutUs", value)} disabled={registerMutation.isPending}>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="family-friends">Family/Friends</SelectItem>
                      <SelectItem value="google-search">Google Search</SelectItem>
                      <SelectItem value="through-luna-shree">Through Luna Shree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} required placeholder="Create a strong password" disabled={registerMutation.isPending} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" disabled={registerMutation.isPending}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleInputChange} required placeholder="Confirm your password" disabled={registerMutation.isPending} />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground" disabled={registerMutation.isPending}>
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  size="lg"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <div className="text-center text-sm">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link href="/login" className="text-[#eb1c23] hover:text-[#7b1c11] font-semibold transition-colors">
                    Sign in
                  </Link>
                </div>
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
