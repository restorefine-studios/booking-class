"use client";

import Hero from "@/components/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Award, Heart, ChevronDown, ChevronUp, Instagram, Youtube, Star } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

  const achievements = [
    {
      icon: Award,
      title: "10+ Years Experience",
      description: "Over a decade of teaching Bollywood and fusion dance",
    },
    {
      icon: Users,
      title: "500+ Students",
      description: "Taught hundreds of students across all skill levels",
    },
    {
      icon: Heart,
      title: "Cultural Ambassador",
      description: "Sharing the beauty of Indian culture through dance",
    },
    {
      icon: Star,
      title: "Performance Artist",
      description: "Regular performances at cultural events and festivals",
    },
  ];

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

  return (
    <div className="pt-0">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 to-pink-50/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">Masala Moves</span>?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">Enjoy movement to your favourite Bollywood Classics and Modern Fusion, taught in a space that celebrates energy, connection and joy.</p>
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

      {/* About Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Meet <span className="text-gradient">Luna Shree</span>
              </h2>

              {/* Mobile image - shows only on mobile, right after title */}
              <div className="lg:hidden w-full">
                <div className="aspect-video w-full rounded-3xl shadow-xl overflow-hidden relative">
                  <Image src="/lunashree.png" alt="Luna Shree - Bollywood Dance Instructor" fill className="object-cover" />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-gray-600 leading-relaxed">&ldquo;I started Masala Moves to bring people together through Bollywood dance to move, learn, and share music that connects us.&rdquo;</p>

                {isExpanded && (
                  <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                    <p>
                      Dance has always been my way of connecting with music, with people, and with myself. I began learning on my own while growing up in Nepal. I started sharing that love for movement online, especially during lockdown, where it grew into a small but meaningful community. While
                      living in London, I joined Bollywood dance classes not just to dance, but to meet people who found joy the same way I did through rhythm, laughter, and shared energy.
                    </p>
                    <p>
                      When I moved to Glasgow, I realised there wasn&apos;t a space where people could come together like that, to move freely, learn, and enjoy music that feels like home. That&apos;s what inspired me to start Masala Moves a space for anyone who loves Bollywood, where dancing
                      together, connecting with others, and finding joy in movement is at the heart of everything we do.
                    </p>
                    <p>Every class brings passion, energy, authenticity and new connections. I aspire to challenge and inspire dancers of all levels in a welcoming space.</p>
                  </div>
                )}

                <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center gap-2 text-[#ef5c28] hover:text-[#ef5c28]/80 transition-colors duration-200 font-medium">
                  {isExpanded ? (
                    <>
                      Read Less <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              <div className="pt-4 w-full">
                <Link href="/contact">
                  <Button className="w-full lg:w-64 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">Get in Touch</Button>
                </Link>
              </div>
            </div>

            {/* Desktop image - shows only on desktop */}

            <div className="relative hidden lg:block">
              <div className="aspect-video w-full rounded-3xl shadow-xl overflow-hidden relative">
                <Image src="/lunashree.png" alt="Luna Shree - Bollywood Dance Instructor" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Achievements & <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">A decade of dedication, passion, and countless moments of joy shared through dance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl transform hover:scale-105 hover:-translate-y-1">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center shadow-lg mb-4">
                    <achievement.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">{achievement.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50/30 to-pink-50/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Ready to Start <span className="text-gradient">Dancing</span>?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">Join our vibrant community and discover the joy of Bollywood dance. Book your first class today and feel the rhythm!</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/classes">
                <Button size="lg" className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold py-7 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  View Classes
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className=" border-2 border-[#eb1c23] text-[#eb1c23] hover:bg-[#eb1c23] hover:text-white font-semibold py-7 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Get in Touch{" "}
                </Button>
              </Link>
            </div>
            <div className="mt-16">
              <div className="flex justify-center items-center space-x-8 text-gray-600">
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron">10+</div>
                  <div className="text-sm">Years Experience</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-bollywood-pink">500+</div>
                  <div className="text-sm">Happy Students</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-saffron">100%</div>
                  <div className="text-sm">Cultural Authenticity</div>
                </div>
              </div>
            </div>

            {/* Connect with us section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Connect with <span className="text-gradient">Us</span>
              </h3>
              <div className="flex justify-center gap-8">
                <a
                  href="https://www.instagram.com/masalamoves3?igsh=NTBuNWZxeGRkZmE5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-full text-white hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="https://www.tiktok.com/@masalamoves3_?_t=ZN-90K34riPhZO&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-full text-white hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Follow us on TikTok"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.89-4.5V8.85a8.16 8.16 0 0 0 4.77 1.52v-3.68a4.85 4.85 0 0 1-1.23 0z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@masalamoves3?si=SYwMJpiZ3JwTrjiV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-full text-white hover:scale-110 transition-transform duration-200 shadow-lg hover:shadow-xl"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
