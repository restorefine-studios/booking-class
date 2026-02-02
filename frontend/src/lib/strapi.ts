export interface Video {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  url: string;
  featured?: boolean;
  thumbnail?: StrapiMedia | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    small?: {
      url: string;
      width: number;
      height: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  hearAboutUs: string;
}

export interface DanceClass {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug?: string;
  instructor: Instructor;
  image: {
    url: string;
    alternativeText?: string;
  };
}

export interface Instructor {
  id: number;
  documentId: string;
  name: string;
  bio: string;
  slug?: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}

export interface ClassOccurrence {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  bookedCount?: number;
  price: number;
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  instructor: string;
  location?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  externalVideoIds?: string[] | null;
  slug?: string | null;
  thumbnail?: StrapiMedia | null;
}

export interface Booking {
  id: number;
  documentId: string;
  user?: User;
  classOccurrence: ClassOccurrence;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  paymentIntentId: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface CreateBookingData {
  classOccurrence: number;
  user?: number; // User ID for authenticated bookings
  bookingDate?: string;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED" | "NO_SHOW";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  paymentAmount: number; // Amount in pounds (decimal)
  notes?: string;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  logo?: {
    url: string;
    alternativeText?: string;
  };
  headerLogo?: {
    url: string;
    alternativeText?: string;
  };
  headerVideo?: {
    url: string;
  };
}

interface CustomRequestInit extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown> | string;
}

class StrapiAPI {
  // Get single video by ID
  async getVideo(id: string): Promise<StrapiResponse<Video>> {
    return this.request(`/videos/${id}?populate=thumbnail`);
  }
  // Videos
  async getVideos(params?: { featured?: boolean }): Promise<StrapiResponse<Video[]>> {
    let query = "/videos?populate=thumbnail";
    if (params?.featured !== undefined) {
      query += `&filters[featured][$eq]=${params.featured}`;
    }
    return this.request(query);
  }
  private baseURL: string;

  constructor() {
    this.baseURL = `${STRAPI_URL}/api`;
  }

  private async request<T = unknown>(endpoint: string, options: CustomRequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Handle body - if it's an object, stringify it; if it's already a string, use as-is
    let processedBody: string | undefined;
    if (options.body !== undefined) {
      if (typeof options.body === "object") {
        processedBody = JSON.stringify(options.body);
      } else {
        processedBody = options.body;
      }
    }

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
      body: processedBody,
    };

    console.log("🔍 Request Debug:", {
      url,
      method: config.method,
      headers: config.headers,
      body: config.body,
      bodyType: typeof config.body,
    });
    console.log("🔍 Final Request Configuration:", {
      url,
      method: config.method,
      headers: config.headers,
      body: config.body,
    });

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`HTTP ${response.status} for ${endpoint}:`, errorBody);

      // Try to parse Strapi error format
      try {
        const errorData = JSON.parse(errorBody);
        if (errorData.error?.message) {
          throw new Error(errorData.error.message);
        }
      } catch (parseError) {
        // If JSON parsing fails or no error message, use the original error
        if (parseError instanceof Error && parseError.message) {
          // Re-throw if it's our intentional error
          throw parseError;
        }
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }

  // Auth - Using Strapi's default APIs only
  async register(userData: { username: string; email: string; password: string; firstName: string; lastName: string; phone: string; address: string; hearAboutUs: string }): Promise<{ jwt: string; user: User }> {
    console.log("📡 Using Strapi's default APIs");

    // Step 1: Register with basic fields using default /auth/local/register
    const basicRegistration: { jwt: string; user: User } = await this.request("/auth/local/register", {
      method: "POST",
      body: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });

    console.log("✅ Basic registration successful");

    // Step 2: Update user with additional fields using default /users/{id}
    try {
      console.log("🔍 About to update user with data:", {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        address: userData.address,
        hearAboutUs: userData.hearAboutUs,
      });

      // Use direct fetch for user update to match working curl command
      const userUpdateResponse = await fetch(`${this.baseURL}/users/${basicRegistration.user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${basicRegistration.jwt}`,
        },
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          phone: userData.phone,
          address: userData.address,
          hearAboutUs: userData.hearAboutUs,
        }),
      });

      if (!userUpdateResponse.ok) {
        const errorBody = await userUpdateResponse.text();
        console.error(`HTTP ${userUpdateResponse.status} for user update:`, errorBody);
        throw new Error(`HTTP ${userUpdateResponse.status}: ${userUpdateResponse.statusText}`);
      }

      const updatedUser: User = await userUpdateResponse.json();

      console.log("✅ User profile updated with additional fields");

      return {
        jwt: basicRegistration.jwt,
        user: updatedUser,
      };
    } catch (error) {
      console.error("❌ Failed to update user profile:", error);
      throw new Error("Registration failed: Unable to save additional information");
    }
  }

  async login(credentials: { identifier: string; password: string }): Promise<{ jwt: string; user: User }> {
    const result: { jwt: string; user: User } = await this.request("/auth/local", {
      method: "POST",
      body: credentials,
    });

    return result;
  }

  async getCurrentUser(token: string): Promise<User> {
    return this.request("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // === CLASS OCCURRENCE METHODS ===

  // Create class occurrence
  async createClassOccurrence(data: Partial<ClassOccurrence>): Promise<StrapiResponse<ClassOccurrence>> {
    return this.request("/class-occurrences", {
      method: "POST",
      body: JSON.stringify({ data }),
    });
  }

  // Update class occurrence
  async updateClassOccurrence(id: string, data: Partial<ClassOccurrence>): Promise<StrapiResponse<ClassOccurrence>> {
    return this.request(`/class-occurrences/${id}`, {
      method: "PUT",
      body: JSON.stringify({ data }),
    });
  }

  // Get all upcoming classes - public endpoint
  async getAllUpcomingClassOccurrences(): Promise<StrapiResponse<ClassOccurrence[]>> {
    const today = new Date().toISOString().split("T")[0];
    return this.request(`/class-occurrences?filters[date][$gte]=${today}&sort=date:asc&populate=thumbnail`);
  }

  // Get class occurrence by ID or slug
  async getClassOccurrence(id: string): Promise<StrapiResponse<ClassOccurrence>> {
    // If id contains non-numeric characters, treat as slug
    if (isNaN(Number(id))) {
      return this.request(`/class-occurrences/slug/${id}?populate=thumbnail`);
    }
    return this.request(`/class-occurrences/${id}?populate=thumbnail`);
  }

  // Delete class occurrence
  async deleteClassOccurrence(id: string): Promise<void> {
    return this.request(`/class-occurrences/${id}`, {
      method: "DELETE",
    });
  }

  // Bookings
  async createBooking(data: CreateBookingData, token?: string): Promise<StrapiResponse<Booking>> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Wrap the payload in a `data` key as required by the backend
    const requestBody = {
      data: {
        classOccurrence: data.classOccurrence,
        user: data.user,
        status: data.status,
        paymentStatus: data.paymentStatus,
        paymentAmount: data.paymentAmount,
        // Only include optional fields if they have values
        ...(data.bookingDate && { bookingDate: data.bookingDate }),
        ...(data.notes && { notes: data.notes }),
      },
    };

    console.log("📦 Booking request payload:", JSON.stringify(requestBody, null, 2));

    // CRITICAL: Use the actual requestBody, not hardcoded values!
    return this.request("/bookings/create", {
      method: "POST",
      headers,
      body: requestBody, // Pass the object directly - request method handles JSON.stringify
    });
  }

  async getBookings(userId?: string): Promise<StrapiResponse<Booking[]>> {
    const token = typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // Filter by user if userId is provided
    const endpoint = userId ? `/bookings?filters[user][id][$eq]=${userId}&populate=classOccurrence.thumbnail&sort=createdAt:desc` : "/bookings?populate=classOccurrence.thumbnail&sort=createdAt:desc";

    console.log("📡 Fetching bookings for user:", userId, "with token:", !!token);
    console.log("📡 Endpoint:", endpoint);

    return this.request(endpoint, {
      headers,
    });
  }

  async getUserBookings(userId: string, token: string): Promise<StrapiResponse<Booking[]>> {
    return this.request(`/bookings?filters[user][id][$eq]=${userId}&populate=classOccurrence,user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Instructors
  async getInstructors(): Promise<StrapiResponse<Instructor[]>> {
    return this.request("/instructors?populate=image");
  }

  async getInstructorBySlug(slug: string): Promise<StrapiResponse<Instructor>> {
    const response = await this.request<StrapiResponse<Instructor[]>>(`/instructors?filters[slug][$eq]=${slug}&populate=image`);

    if (response.data && response.data.length > 0) {
      return {
        data: response.data[0],
        meta: response.meta,
      };
    }

    throw new Error("Instructor not found");
  }

  // Site Settings
  async getSiteSettings(): Promise<StrapiResponse<SiteSettings>> {
    return this.request("/site-setting?populate=logo,headerLogo,headerVideo");
  }

  // Update user profile
  async updateUserProfile(userId: string, userData: Partial<User>, token?: string): Promise<StrapiResponse<User>> {
    const headers: Record<string, string> = {};

    // Add authorization header if token is provided
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.request(`/users/${userId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(userData),
    });
  }

  // Update current user profile using /users/me endpoint
  async updateCurrentUserProfile(userData: Partial<User>, token: string): Promise<User> {
    return this.request(`/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
  }

  // Get current user profile
  async getCurrentUserProfile(token: string): Promise<User> {
    return this.request(`/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Get specific user profile (requires permissions)
  async getUserProfile(userId: string, token: string): Promise<StrapiResponse<User>> {
    return this.request(`/users/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export const strapiAPI = new StrapiAPI();

export function getStrapiMediaURL(url: string): string {
  if (url.startsWith("http")) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}
