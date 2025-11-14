"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import { Calendar, Clock, MapPin, Loader2, CheckCircle, User, Mail, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMediaURL, type Booking } from "@/lib/strapi";

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: authState, isLoading: authLoading } = useAuthState();
  const { data: bookingsData, isLoading: bookingsLoading, refetch: refetchBookings } = useBookings(authState?.user?.id?.toString());
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!authLoading && !authState?.isAuthenticated) {
      router.push("/login?returnUrl=/dashboard");
    }
  }, [authState, authLoading, router]);

  useEffect(() => {
    const paymentStatus = searchParams.get("payment");
    const sessionId = searchParams.get("session_id");

    if (paymentStatus === "success") {
      setShowSuccessMessage(true);

      console.log("✅ Payment successful! Session ID:", sessionId);
      console.log("🔄 Booking should be created by webhook soon...");

      // Poll for the booking to appear (webhook might take a few seconds)
      let pollCount = 0;
      const maxPolls = 10; // Poll for up to 30 seconds (3s * 10)

      const pollInterval = setInterval(async () => {
        pollCount++;
        console.log(`🔄 Polling for new booking... (attempt ${pollCount}/${maxPolls})`);

        // Refetch bookings
        const result = await refetchBookings();
        if (result.data?.data && result.data.data.length > 0) {
          console.log("✅ Booking found! Total bookings:", result.data.data.length);
          clearInterval(pollInterval);
        }

        if (pollCount >= maxPolls) {
          console.log("⏱️ Stopped polling. If booking still not visible, please refresh the page.");
          clearInterval(pollInterval);
        }
      }, 3000); // Poll every 3 seconds

      // Remove the query params from URL after 8 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
        router.replace("/dashboard", { scroll: false });
        clearInterval(pollInterval);
      }, 8000);

      return () => clearInterval(pollInterval);
    }
  }, [searchParams, router, refetchBookings]);

  useEffect(() => {
    if (!authLoading && !authState?.isAuthenticated) {
      router.push("/login?returnUrl=/dashboard");
    }
  }, [authState, authLoading, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authState?.isAuthenticated) {
    return null;
  }

  const bookings = bookingsData?.data || [];
  const upcomingBookings = bookings.filter((booking: Booking) => {
    const classDate = new Date(booking.classOccurrence?.date || "");
    return classDate >= new Date() && booking.status === "confirmed";
  });

  const pastBookings = bookings.filter((booking: Booking) => {
    const classDate = new Date(booking.classOccurrence?.date || "");
    return classDate < new Date() || booking.status !== "confirmed";
  });

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-orange-50 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-5 duration-500">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-xl">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-green-900 mb-1">Payment Successful!</h3>
                  <p className="text-green-700">Your booking has been confirmed. Welcome to the class!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-gradient">{authState.user?.firstName || authState.user?.username}</span>!
          </h1>
          <p className="text-gray-600 text-lg">Manage your bookings and account details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Account Info Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden sticky top-24">
              <CardHeader className="bg-gradient-to-r from-[#eb1c23]/5 to-[#7b1c11]/5">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#eb1c23]" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <User className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Name</p>
                    <p className="text-sm font-semibold text-gray-900">{authState.user?.firstName && authState.user?.lastName ? `${authState.user.firstName} ${authState.user.lastName}` : authState.user?.username || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-sm font-semibold text-gray-900">{authState.user?.email || "N/A"}</p>
                  </div>
                </div>

                {authState.user?.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <Phone className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">{authState.user.phone}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gradient-to-br from-[#eb1c23]/10 to-[#7b1c11]/10 rounded-xl">
                      <p className="text-2xl font-bold text-[#eb1c23]">{upcomingBookings.length}</p>
                      <p className="text-xs text-gray-600 font-medium">Upcoming</p>
                    </div>
                    <div className="text-center p-3 bg-gray-100 rounded-xl">
                      <p className="text-2xl font-bold text-gray-700">{pastBookings.length}</p>
                      <p className="text-xs text-gray-600 font-medium">Past</p>
                    </div>
                  </div>

                  <Link href="/classes" className="block">
                    <Button className="w-full bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold shadow-lg">Book New Class</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Bookings */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-[#eb1c23]" />
                Upcoming Classes
              </h2>

              {bookingsLoading ? (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                  <CardContent className="py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#eb1c23]" />
                    <p className="text-gray-600 mt-4">Loading your bookings...</p>
                  </CardContent>
                </Card>
              ) : bookings.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h3>
                    <p className="text-gray-600 mb-4">You haven&apos;t booked any classes yet, or your recent booking is still being processed.</p>
                    <p className="text-sm text-gray-500 mb-6">If you just completed a payment, please wait a moment and refresh the page.</p>
                    <div className="flex gap-3 justify-center">
                      <Button onClick={() => window.location.reload()} variant="outline" className="font-medium">
                        Refresh Page
                      </Button>
                      <Link href="/classes">
                        <Button className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold">Browse Classes</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : upcomingBookings.length === 0 ? (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl">
                  <CardContent className="py-12 text-center">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Classes</h3>
                    <p className="text-gray-600 mb-6">You haven&apos;t booked any classes yet. Start your dance journey today!</p>
                    <Link href="/classes">
                      <Button className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold">Browse Classes</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((booking: Booking) => (
                    <Card key={booking.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Image */}
                          <div className="relative w-full sm:w-48 h-48 sm:h-auto bg-gradient-to-br from-[#eb1c23]/10 to-[#7b1c11]/10 flex-shrink-0">
                            {booking.classOccurrence?.thumbnail ? (
                              <Image src={getStrapiMediaURL(booking.classOccurrence.thumbnail.url)} alt={booking.classOccurrence.title} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Calendar className="h-12 w-12 text-[#eb1c23]" />
                              </div>
                            )}
                            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                              <CheckCircle className="h-3 w-3" />
                              Confirmed
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex-grow p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{booking.classOccurrence?.title || "Class"}</h3>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-gray-600">
                                <Calendar className="h-4 w-4 mr-2 text-[#eb1c23]" />
                                <span className="text-sm">{formatDate(booking.classOccurrence?.date)}</span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <Clock className="h-4 w-4 mr-2 text-[#eb1c23]" />
                                <span className="text-sm">
                                  {formatTime(booking.classOccurrence?.startTime)} - {formatTime(booking.classOccurrence?.endTime)}
                                </span>
                              </div>
                              {booking.classOccurrence?.location && (
                                <div className="flex items-center text-gray-600">
                                  <MapPin className="h-4 w-4 mr-2 text-[#eb1c23]" />
                                  <span className="text-sm">{booking.classOccurrence.location}</span>
                                </div>
                              )}
                            </div>

                            {booking.classOccurrence?.description && <p className="text-sm text-gray-600 line-clamp-2">{booking.classOccurrence.description}</p>}

                            <div className="mt-4 pt-4 border-t flex items-center justify-between">
                              <div className="text-sm">
                                <span className="text-gray-500">Booking ID: </span>
                                <span className="font-mono text-gray-700">#{booking.id}</span>
                              </div>
                              <div className="text-lg font-bold text-[#eb1c23]">£{booking.classOccurrence?.price?.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-gray-600" />
                  Past Classes
                </h2>

                <div className="space-y-4">
                  {pastBookings.map((booking: Booking) => (
                    <Card key={booking.id} className="bg-white/60 backdrop-blur-sm border-0 shadow-md rounded-3xl overflow-hidden opacity-75">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          {/* Image */}
                          <div className="relative w-full sm:w-32 h-32 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                            {booking.classOccurrence?.thumbnail ? (
                              <Image src={getStrapiMediaURL(booking.classOccurrence.thumbnail.url)} alt={booking.classOccurrence.title} fill className="object-cover grayscale" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Calendar className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-grow p-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">{booking.classOccurrence?.title || "Class"}</h3>

                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(booking.classOccurrence?.date)}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTime(booking.classOccurrence?.startTime)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
