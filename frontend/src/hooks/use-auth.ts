"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { strapiAPI } from "@/lib/strapi";
import { toast } from "@/lib/toast";

interface LoginCredentials {
  identifier: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  hearAboutUs: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  hearAboutUs?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Query key factory
export const authKeys = {
  all: ["auth"] as const,
  user: () => [...authKeys.all, "user"] as const,
};

// Get current auth state
export function useAuthState() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: (): AuthState => {
      const token = localStorage.getItem("jwt");
      const userData = localStorage.getItem("user");

      console.log("🔍 TanStack Query: Checking authentication state");
      console.log("🔑 Token exists:", !!token);
      console.log("👤 User data exists:", !!userData);
      console.log("🔑 Token value:", token);
      console.log("👤 User data:", userData);

      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log("✅ Parsed user:", parsedUser);
          return {
            user: parsedUser,
            token,
            isAuthenticated: true,
          };
        } catch (error) {
          console.error("❌ Error parsing user data:", error);
          localStorage.removeItem("jwt");
          localStorage.removeItem("user");
        }
      }

      console.log("❌ No valid token or user data found");
      return {
        user: null,
        token: null,
        isAuthenticated: false,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => strapiAPI.login(credentials),
    onSuccess: (data) => {
      console.log("🎉 Login successful! Response data:", data);
      console.log("🔑 JWT token:", data.jwt);
      console.log("👤 User data:", data.user);

      // Store the JWT token and user data
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("💾 Stored in localStorage:");
      console.log("🔑 jwt:", localStorage.getItem("jwt"));
      console.log("👤 user:", localStorage.getItem("user"));

      // Update the auth state in TanStack Query
      queryClient.setQueryData(authKeys.user(), {
        user: data.user,
        token: data.jwt,
        isAuthenticated: true,
      });

      // Show success toast
      toast.success(`Welcome back, ${data.user.firstName || data.user.username}! 🎉`);
    },
    onError: (error: Error) => {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    },
  });
}

// Register mutation
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: RegisterData) => strapiAPI.register(userData),
    onSuccess: (data) => {
      console.log("🎉 Registration successful! Response data:", data);

      // Store the JWT token and user data
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update the auth state in TanStack Query
      queryClient.setQueryData(authKeys.user(), {
        user: data.user,
        token: data.jwt,
        isAuthenticated: true,
      });

      // Show success toast
      toast.success(`Welcome to Masala Moves, ${data.user.firstName || data.user.username}! 🕺💃`);
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      // Check if the error message indicates account already exists
      const errorMsg = error.message.toLowerCase();
      if ((errorMsg.includes("email") && errorMsg.includes("already taken")) || (errorMsg.includes("username") && errorMsg.includes("already taken")) || errorMsg.includes("already exists")) {
        toast.error("Account already exists. Please log in instead.");
      } else {
        toast.error(error.message || "Registration failed. Please try again or contact support.");
      }
    },
  });
}

// Logout function
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log("🚪 Logging out user");
      // Clear local storage
      localStorage.removeItem("jwt");
      localStorage.removeItem("user");
      return Promise.resolve();
    },
    onSuccess: () => {
      // Update the auth state in TanStack Query
      queryClient.setQueryData(authKeys.user(), {
        user: null,
        token: null,
        isAuthenticated: false,
      });

      // Show logout toast
      toast.info("You've been logged out successfully. See you soon! 👋");

      // Clear all cached data
      queryClient.clear();
    },
  });
}
