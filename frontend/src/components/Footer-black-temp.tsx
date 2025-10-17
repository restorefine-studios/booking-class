import Link from "next/link";
import Image from "next/image";
import { Instagram, Youtube, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#eb1c23]/20 via-transparent to-[#7b1c11]/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_rgba(235,28,35,0.1)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,_rgba(123,28,17,0.1)_0%,_transparent_50%)]"></div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-3 h-3 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-gradient-to-r from-[#7b1c11] to-[#eb1c23] rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-gradient-to-r from-[#7b1c11] to-[#eb1c23] rounded-full animate-bounce opacity-50"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              {/* Logo and Brand */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Image 
                    src="/logo.svg" 
                    alt="Masala Moves Logo" 
                    width={80} 
                    height={80} 
                    className="transform hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#eb1c23]/30 to-[#7b1c11]/30 rounded-2xl blur-lg opacity-0 hover:opacity-60 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-lg max-w-md">Connecting cultures through dance. Experience the vibrant world of Bollywood fusion with authentic choreography and passionate instruction in the heart of Glasgow.</p>

              {/* CTA Section */}
              <div className="space-y-4">
                <p className="text-white font-semibold text-lg">Ready to start dancing?</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/classes" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group">
                    <span>Book Your First Class</span>
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link href="/about" className="inline-flex items-center px-6 py-3 border-2 border-[#eb1c23] text-[#eb1c23] font-semibold rounded-xl hover:bg-[#eb1c23] hover:text-white transition-all duration-300">
                    Meet Luna
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-lg flex items-center justify-center mr-3">
                <Mail className="h-4 w-4 text-white" />
              </div>
              Get In Touch
            </h3>

            <div className="space-y-4">
              <div className="group cursor-pointer">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-[#eb1c23]/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-lg flex items-center justify-center group-hover:from-[#eb1c23] group-hover:to-[#7b1c11] transition-all duration-300">
                    <MapPin className="h-5 w-5 text-[#eb1c23] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Studio Location</p>
                    <p className="text-gray-400 text-sm mt-1">Studio 22, Jamaica Street</p>
                    <p className="text-gray-400 text-sm">Glasgow, Scotland</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-[#eb1c23]/30">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-lg flex items-center justify-center group-hover:from-[#eb1c23] group-hover:to-[#7b1c11] transition-all duration-300">
                    <Mail className="h-5 w-5 text-[#eb1c23] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400 text-sm mt-1">nepallunashree@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <a
                  href="https://www.instagram.com/masalamoves3?igsh=NTBuNWZxeGRkZmE5&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50 hover:border-[#eb1c23]/30"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-[#eb1c23]/20 to-[#7b1c11]/20 rounded-lg flex items-center justify-center group-hover:from-[#eb1c23] group-hover:to-[#7b1c11] transition-all duration-300">
                    <Instagram className="h-5 w-5 text-[#eb1c23] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Instagram</p>
                    <p className="text-gray-400 text-sm mt-1">@masalamoves3</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Social & Navigation */}
          <div className="space-y-8">
            {/* Social Media */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-lg flex items-center justify-center mr-3">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
                Follow Our Journey
              </h3>

              <div className="flex space-x-4">
                <a href="https://www.instagram.com/masalamoves3?igsh=NTBuNWZxeGRkZmE5&utm_source=qr" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Instagram">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-[#eb1c23] group-hover:to-[#7b1c11] transition-all duration-300 shadow-lg">
                    <Instagram className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
                </a>

                <a href="https://youtube.com/@masalamoves3?si=SYwMJpiZ3JwTrjiV" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="YouTube">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-[#eb1c23] group-hover:to-[#7b1c11] transition-all duration-300 shadow-lg">
                    <Youtube className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
                </a>

                <a href="https://www.tiktok.com/@masalamoves3_?_t=ZN-90K34riPhZO&_r=1" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="TikTok">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center group-hover:from-[#eb1c23] group-hover:to-[#7b1c11] transition-all duration-300 shadow-lg">
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.89-4.5V8.85a8.16 8.16 0 0 0 4.77 1.52v-3.68a4.85 4.85 0 0 1-1.23 0z" />
                    </svg>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg"></div>
                </a>
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "/" },
                  { name: "Classes", href: "/classes" },
                  { name: "About Luna", href: "/about" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group">
                      <span className="w-2 h-2 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">&copy; 2025 Masala Moves. All rights reserved.</p>
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-gray-500 text-sm">Made with</span>
                <div className="w-4 h-4 bg-gradient-to-r from-[#eb1c23] to-[#7b1c11] rounded-full animate-pulse"></div>
                <span className="text-gray-500 text-sm">for the dance community</span>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
