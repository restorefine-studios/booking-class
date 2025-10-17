"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Mail, Clock, Send, CheckCircle, Heart, Sparkles, Music } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary/10 via-bollywood-pink/5 to-cream/20 overflow-hidden  " style={{ backgroundImage: "url(/label.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 text-primary/20">
            <Heart className="h-8 w-8 animate-pulse" />
          </div>
          <div className="absolute top-20 right-20 text-bollywood-pink/30">
            <Sparkles className="h-6 w-6 animate-bounce delay-300" />
          </div>
          <div className="absolute bottom-20 left-20 text-primary/25">
            <Music className="h-10 w-10 animate-pulse delay-500" />
          </div>
          <div className="absolute bottom-10 right-10 text-bollywood-pink/20">
            <Sparkles className="h-8 w-8 animate-bounce" />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Heart className="h-4 w-4 text-white" />
            <span className="text-sm font-medium text-white ">Let&apos;s Connect</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="text-white">Get in Touch</span>
            <br />
            <span className="text-2xl md:text-3xl font-normal text-white">with Luna Shree</span>
          </h1>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-white mb-6">Ready to embark on your Bollywood dance journey? Whether you&apos;re a complete beginner or looking to perfect your moves, Luna is here to guide you every step of the way.</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ef5c28] rounded-full animate-pulse"></div>
                <span>Professional Instruction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ef5c28]  rounded-full animate-pulse delay-200"></div>
                <span>All Skill Levels Welcome</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ef5c28] rounded-full animate-pulse delay-400"></div>
                <span>Personalized Approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information - Simplified */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Let&apos;s Connect</h2>
                <p className="text-lg text-gray-600">Ready to start your dance journey? Here&apos;s how to reach us.</p>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Studio Location</h3>
                    <p className="text-gray-600">Studio 22, Jamaica Street</p>
                    <p className="text-gray-600">Glasgow, Scotland</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                    <a href="mailto:nepallunashree@gmail.com" className="text-gray-600 hover:text-[#eb1c23] transition-colors">
                      nepallunashree@gmail.com
                    </a>
                  </div>
                </div>

                {/* Studio Hours */}
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Studio Hours</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Friday: 6:00 PM - 10:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: 2:00 PM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Simplified */}
              {/* <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 border-2 border-[#eb1c23]/30 text-[#eb1c23] hover:bg-[#eb1c23] hover:text-white transition-all duration-300" asChild>
                    <Link href="/classes">View Classes</Link>
                  </Button>
                  <Button variant="outline" className="h-12 border-2 border-[#eb1c23]/30 text-[#eb1c23] hover:bg-[#eb1c23] hover:text-white transition-all duration-300" asChild>
                    <Link href="/about">About Luna</Link>
                  </Button>
                </div>
              </div> */}
            </div>

            {/* Contact Form - Simplified */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl text-gray-900">Send us a Message</CardTitle>
                  <CardDescription className="text-base text-gray-600">Have questions about classes or want to book a session? We&apos;d love to hear from you!</CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">Message Sent!</h3>
                      <p className="text-gray-600">We&apos;ll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name *
                          </Label>
                          <Input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} required placeholder="Your full name" className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address *
                          </Label>
                          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required placeholder="your.email@example.com" className="h-12" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                          Subject *
                        </Label>
                        <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleInputChange} required placeholder="e.g., Class Inquiry" className="h-12" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                          Message *
                        </Label>
                        <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required placeholder="Tell us about your interest in dance classes..." rows={6} className="resize-none" />
                      </div>

                      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-12 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-medium transition-all duration-300">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#eb1c23]/10 to-[#7b1c11]/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-[#eb1c23]/5 to-[#7b1c11]/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#eb1c23]/5 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#eb1c23]/10 to-[#7b1c11]/10 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-[#eb1c23]/20">
              <Sparkles className="h-5 w-5 text-[#eb1c23]" />
              <span className="text-sm font-semibold text-[#eb1c23] uppercase tracking-wider">Got Questions?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-[#eb1c23] to-gray-900 bg-clip-text text-transparent">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about starting your extraordinary Bollywood dance journey with Luna.
              <span className="text-[#eb1c23] font-semibold"> Let&apos;s make your dreams dance!</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* FAQ Item 1 */}
            <Card className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#eb1c23] transition-colors duration-300">Do I need prior dance experience?</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Absolutely not! Luna&apos;s classes welcome dancers of all levels - from those who&apos;ve never danced before to experienced performers. Luna&apos;s teaching approach adapts to each student, ensuring everyone feels comfortable and progresses at their own pace.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 2 */}
            <Card className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#eb1c23] transition-colors duration-300">What should I wear to class?</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Comfort is key! Wear breathable, stretchy clothing that allows free movement - think athletic wear, loose pants, or comfortable skirts. Bring water, a towel, and wear shoes with good grip. Many students love wearing colorful outfits to match the vibrant Bollywood spirit!
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 3 */}
            <Card className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#eb1c23] transition-colors duration-300">How far in advance can I book?</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  You can book classes up to 2 weeks in advance through our online booking system. This helps ensure fair access for all students and maintains optimal class sizes for the best learning experience. Popular time slots fill up quickly!
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 4 */}
            <Card className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#eb1c23] transition-colors duration-300">What is your cancellation policy?</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  We understand life happens! Full refunds are available for cancellations made at least 24 hours before class. For shorter notice cancellations, we offer class credits that can be used for future sessions - because we want you to dance when it&apos;s right for you!
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 5 */}
            <Card className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Music className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#eb1c23] transition-colors duration-300">Do you offer private lessons?</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Yes! Luna offers private and semi-private lessons perfect for personalized attention, wedding choreography, special events, or if you prefer one-on-one instruction. These sessions can be tailored to your specific goals and schedule.
                </p>
              </CardContent>
            </Card>

            {/* FAQ Item 6 */}
            <Card className="group border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#eb1c23] to-[#7b1c11] rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-[#eb1c23] transition-colors duration-300">How do I get to the studio?</h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed text-base">
                  Located in the heart of Glasgow city center! The studio is easily accessible by public transport with several bus stops nearby. Street parking and public car parks are available within walking distance. Full directions will be sent with your booking confirmation.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] p-8 rounded-3xl shadow-2xl max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
              <p className="text-white/90 mb-6 text-lg">We&apos;re here to help you start your amazing dance journey!</p>
              <Button size="lg" className="bg-white text-[#eb1c23] hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                <Link href="#contact-form">Ask Your Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
