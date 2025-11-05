"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getStrapiMediaURL, type ClassOccurrence } from "@/lib/strapi";
import { useClasses } from "@/hooks/use-classes";
import { generateSlug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, Users, Loader2, Mail, Instagram, Heart, Award } from "lucide-react";

export default function ClassesPage() {
  const features = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book classes up to 4 weeks in advance with easy online booking system.",
    },
    {
      icon: Users,
      title: "Welcome for all",
      description: "You are welcome if you enjoy dancing, no prior experience required.",
    },
    {
      icon: Award,
      title: "Dance Don’t Stress",
      description: "Luna Shree’s choreos flows with music, no typical style just versatile, expressive and always fun!",
    },
    {
      icon: Heart,
      title: "Building Connections",
      description: "These classes are more than your weekly escape, a way to connect with others through movement in a shared space.  ",
    },
  ];

  const { data: classesResponse, isLoading, error } = useClasses();
  const classes = classesResponse?.data || [];

  // Debug logging
  console.log("Classes Page Debug:", {
    isLoading,
    error: error?.message,
    classes,
    classesLength: classes.length,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeFromString = (timeStr: string) => {
    // Parse time string in HH:MM:SS format and convert to AM/PM
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    // Parse time strings in HH:MM:SS format
    const parseTime = (timeStr: string) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes; // Convert to total minutes
    };

    const startMinutes = parseTime(startTime);
    const endMinutes = parseTime(endTime);

    // Handle case where end time is next day (e.g., start: 23:00, end: 01:00)
    let durationMinutes = endMinutes - startMinutes;
    if (durationMinutes < 0) {
      durationMinutes += 24 * 60; // Add 24 hours worth of minutes
    }

    // Format as hr:min
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen pt-16 flex items-center justify-center">
  //       <div className="text-center">
  //         <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
  //         <p className="text-muted-foreground">Loading classes...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen pt-16 flex items-center justify-center">
  //       <div className="text-center">
  //         <p className="text-destructive mb-4">{error.message}</p>
  //         <Button onClick={() => window.location.reload()}>Try Again</Button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/label1.png)" }}>
        {/* <div className="absolute inset-0 bg-black/50"></div> */}
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-lg">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            <span className="text-white">Dance Classes</span>
          </h1>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">Find the perfect class for you, that fits your schedule!</p>
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl mx-auto">You can book our weekly classes upto 4 weeks in advance with our easy online booking system.</p>
        </div>
      </section>
      {/* Weekly Classes Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8 order-1">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                {/* <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gradient-to-r from-saffron to-bollywood-pink rounded-full"></div>
                  ))}
                </div> */}
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  <span className="text-gradient">Weekly Classes</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  Join our regular weekly dance sessions and immerse yourself in the vibrant world of Bollywood. Our weekly classes are designed for you to dance to a choreography each week with a variety of style. Crafted for you to enjoy your hour and complete a bit of a challenge, all while you
                  connect with a community of dance enthusiast like yourself.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                      <Award className="h-4 w-4 text-[#eb1c23]" />
                    </div>
                    <span className="text-gray-700">Professional Studio environment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                      <Heart className="h-4 w-4 text-[#eb1c23]" />
                    </div>
                    <span className="text-gray-700">Bollywood escape just for you</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                      <Users className="h-4 w-4 text-[#eb1c23]" />
                    </div>
                    <span className="text-gray-700">Build lasting friendships</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => {
                      const element = document.getElementById("upcoming-classes");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Join Weekly Classes
                  </Button>
                  {/* <Button variant="outline" className="border-2 border-[#eb1c23] text-[#eb1c23] hover:bg-[#eb1c23] hover:text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    View Schedule
                  </Button> */}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image src="/Picture2.png" alt="Weekly Dance Classes" width={600} height={400} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      {/* Enquiries Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 to-pink-50/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image - Left on desktop, First on mobile */}
            <div className="relative order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500">
                <Image src="/enquiry.jpg" alt="Dance Enquiries" width={600} height={400} className="w-full h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
            </div>

            {/* Content - Right on desktop, Second on mobile */}
            <div className="space-y-8 order-2">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-lg">
                  <Link href="/contact">
                    <Mail className="w-6 h-6 text-white" />
                  </Link>
                </div>
                {/* <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-gradient-to-r from-saffron to-bollywood-pink rounded-full"></div>
                  ))}
                </div> */}
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                  Just for you! <span className="text-gradient">Get In Touch</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">Are you looking for private lessons, private workshops, gift vouchers, wedding or special event creative packages. Please get in touch with your requirements to bring your vision to life with our creativity</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gradient-to-br hover:from-[#eb1c23]/30 hover:to-[#7b1c11]/30 transition-all duration-300">
                      <Mail className="h-4 w-4 text-[#eb1c23]" />
                    </div>

                    <span className="text-gray-700">Email us your questions anytime</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                      <Instagram className="h-4 w-4 text-[#eb1c23]" />
                    </div>
                    <span className="text-gray-700">DM us on Instagram for quick responses</span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                      <Users className="h-4 w-4 text-[#eb1c23]" />
                    </div>
                    <span className="text-gray-700">Personal consultation available</span>
                  </div> */}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact" className="hidden sm:block">
                    <Button className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Contact Us Today</Button>
                  </Link>
                  {/* <Button variant="outline" className="border-2 border-[#7b1c11] text-[#7b1c11] hover:bg-[#7b1c11] hover:text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Book Consultation
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ----- not needed rn so commented out ----- */}
      {/* Classes Section */}

      <section id="upcoming-classes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {classes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-xl mb-8">
                <Calendar className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Classes schedule</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md mx-auto">There are currently no classes scheduled for the next 2 weeks. Check back soon or contact Luna to schedule a class.</p>
              <Link href="/contact#faq">
                <Button className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Any Questions?</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-full"></div>
                  <Calendar className="w-6 h-6 text-[#eb1c23]" />
                  <div className="w-12 h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-full"></div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Upcoming <span className="text-gradient">Classes</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">{classes.length} classes available for booking</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {classes.map((classItem: ClassOccurrence) => (
                  <div key={classItem.id} className="group relative">
                    <div className="relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 transform hover:-translate-y-2">
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                          <span className="text-xl font-bold text-gradient">£{classItem.price}</span>
                        </div>
                      </div>

                      <div className="relative h-56 overflow-hidden">
                        {classItem.thumbnail ? (
                          <Image src={getStrapiMediaURL(classItem.thumbnail.url)} alt={classItem.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#eb1c23]/10 via-[#7b1c11]/10 to-[#eb1c23]/5 flex items-center justify-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-3xl flex items-center justify-center shadow-xl">
                              <Calendar className="h-10 w-10 text-white" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                        <div className="absolute bottom-4 left-4">
                          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-lg">
                            <p className="text-sm font-semibold text-gray-900">{formatDate(classItem.date)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gradient transition-all duration-300">{classItem.title}</h3>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                                <Clock className="h-4 w-4 text-[#eb1c23]" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">
                                  {formatTimeFromString(classItem.startTime)} - {formatTimeFromString(classItem.endTime)}
                                </p>
                                <p className="text-xs text-gray-500">{calculateDuration(classItem.startTime, classItem.endTime)} class</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-[#7b1c11]" />
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-900">{classItem.location}</p>
                                <p className="text-xs text-gray-500">Studio location</p>
                              </div>
                            </div>
                          </div>

                          {classItem.maxCapacity && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-xl flex items-center justify-center">
                                  <Users className="h-4 w-4 text-[#eb1c23]" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{classItem.maxCapacity} spots</p>
                                  <p className="text-xs text-gray-500">Available</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="pt-4">
                          <Link href={`/classes/${generateSlug(classItem.title)}`} className="block">
                            <Button className="w-full bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">Book This Class</Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -inset-1 bg-gradient-to-r from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 to-pink-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">Our Classes</span>?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">Experience the perfect blend of traditional Bollywood and modern fusion dance in a welcoming environment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl transform hover:scale-105 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-lg mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
