"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0  z-10">
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <div className=" backdrop-blur-sm p-8 rounded-3xl ">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-[#ef5c28] via-[#7b1c11] to-[#ef5c28] bg-clip-text text-transparent animate-gradient-x">Move. Feel. Connect!</h1>

          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join Luna Shree for authentic Bollywood fusion classes in Glasgow.
            <span className="block mt-2 text-white">Free yourself with the rhythm of Bollywood at the heart of Glasgow one choreo at a time.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/classes">
              <Button size="lg" className="bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] hover:from-[#eb1c23]/90 hover:to-[#7b1c11]/90 text-white font-semibold py-7 px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Book Your Class
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-2  border-white text-white  hover:text-[#eb1c23] font-semibold py-7 px-10 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/10 backdrop-blur-sm">
                Meet Luna
              </Button>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
