"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuthState, useLogout } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  // Use TanStack Query for auth state
  const { data: authState, isLoading } = useAuthState();
  const logoutMutation = useLogout();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    // { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  const getUserDisplayName = () => {
    const user = authState?.user;
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user?.username || user?.email || "User";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-black/5"></div>

      <div className="relative container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo with enhanced styling */}
          <div className="flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute -inset-2  opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
                <Image src="/logo.svg" alt="Masala Moves Logo" width={100} height={100} className=" transition-transform duration-300 group-hover:rotate-3" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with enhanced styling */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <Link key={item.name} href={item.href} className="relative px-4 py-2 text-gray-700 font-medium transition-all duration-300 hover:text-[#eb1c23] group" style={{ animationDelay: `${index * 100}ms` }}>
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#eb1c23]/10 to-[#7b1c11]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100"></div>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions with enhanced buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!isLoading && (
              <>
                {authState?.isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10 transition-all duration-300 border border-gray-200 hover:border-[#eb1c23]/30 shadow-sm">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">{getUserDisplayName()}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl">
                      <DropdownMenuLabel className="text-gray-900">My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/bookings" className="hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10">
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-destructive hover:bg-red-50" disabled={logoutMutation.isPending}>
                        <LogOut className="h-4 w-4 mr-2" />
                        {logoutMutation.isPending ? "Logging out..." : "Logout"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost" className="px-6 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10 transition-all duration-300 border border-gray-200 hover:border-[#eb1c23]/30 font-medium">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button variant="outline" className="px-6 py-2 rounded-xl border-2 border-[#eb1c23]/30 text-[#eb1c23] hover:bg-[#eb1c23] hover:text-white transition-all duration-300 font-medium shadow-sm">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
                <Link href="/classes">
                  <Button className="px-6 py-2 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <span className="relative z-10">Book Now</span>
                    <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative w-12 h-12 rounded-xl hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10 transition-all duration-300 border border-gray-200 hover:border-[#eb1c23]/30">
              <div className="relative">{isMenuOpen ? <X className="h-6 w-6 text-[#eb1c23]" /> : <Menu className="h-6 w-6 text-[#eb1c23]" />}</div>
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 shadow-xl">
            <div className="px-4 py-6 space-y-3">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-[#eb1c23] hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10 rounded-xl transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-gray-200">
                {!isLoading && (
                  <>
                    {authState?.isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 text-sm font-medium text-gray-900 bg-gradient-to-r from-[#eb1c23]/10 to-[#7b1c11]/10 rounded-xl border border-[#eb1c23]/20">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-full flex items-center justify-center">
                              <User className="h-3 w-3 text-white" />
                            </div>
                            <span>{getUserDisplayName()}</span>
                          </div>
                        </div>
                        <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10">
                            Dashboard
                          </Button>
                        </Link>
                        <Link href="/bookings" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10">
                            My Bookings
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start py-3 text-destructive hover:bg-red-50 rounded-xl"
                          onClick={() => {
                            handleLogout();
                            setIsMenuOpen(false);
                          }}
                          disabled={logoutMutation.isPending}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          {logoutMutation.isPending ? "Logging out..." : "Logout"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start py-3 rounded-xl hover:bg-gradient-to-r hover:from-[#eb1c23]/10 hover:to-[#7b1c11]/10">
                            Login
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full justify-start py-3 rounded-xl border-2 border-[#eb1c23]/30 text-[#eb1c23] hover:bg-[#eb1c23] hover:text-white">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                    <Link href="/classes" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full py-3 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold rounded-xl shadow-lg">Book Now</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
