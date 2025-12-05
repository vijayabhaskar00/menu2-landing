"use client"

import { ChevronDown } from "lucide-react"
import Image from "next/image"
import heroImage from "./about_1_1.png"
export default function HeroSection() {
  return (
    <>
      <section className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImage || "/placeholder.svg"}
            alt="Itlu - Authentic Indian Vegetarian Restaurant"
            fill
            priority
            quality={95}
            className="object-cover brightness-75"
            sizes="100vw"
          />

          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-3 sm:px-6 lg:px-8 max-w-4xl sm:max-w-5xl mx-auto w-full">
          {/* Elegant heading with subtle animation */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-6 leading-tight animate-fade-in">
            Welcome to <span className="text-amber-400 drop-shadow-lg">ITLU</span> USA
          </h1>

          {/* Subtitle with beautiful typography */}
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-amber-100 font-light tracking-wide mb-4 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Experience authentic Indian vegetarian cuisine crafted with tradition, love, and the finest ingredients
          </p>

          {/* Tagline / Subtext */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-amber-200 italic font-medium opacity-90">
            Pure • Fresh • Soulful
          </p>

          {/* Optional CTA Button */}
          <div className="mt-6 sm:mt-12">
            <button
              onClick={() => (window.location.href = "/menu")}
              className="bg-amber-500 cursor-pointer hover:bg-amber-600 text-black font-semibold text-sm xs:text-base sm:text-lg px-6 xs:px-8 sm:px-10 py-2.5 xs:py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/50"
            >
              Grand Opening Menu
            </button>
          </div>

          <div className="mt-4 sm:mt-8 w-full px-2">
            <div className="relative overflow-hidden bg-gradient-to-r from-transparent via-amber-500/20 to-transparent rounded-full py-2 sm:py-4 px-3 sm:px-6 backdrop-blur-sm border border-amber-400/30">
              <div className="flex animate-scroll-text whitespace-nowrap">
                {/* Repeating text carousel */}
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <span
                    key={idx}
                    className="text-amber-100 font-medium text-xs sm:text-base flex items-center gap-1.5 sm:gap-2 mr-4 sm:mr-6"
                  >
                    <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
                    Full menu is coming soon — Stay tuned!
                    <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator - FIXED */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-400/70 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-3 bg-amber-400 rounded-full animate-scroll-down" />
            </div>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400/70 animate-pulse" />
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll-text {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-down {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(16px);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-scroll-text {
          animation: scroll-text 20s linear infinite;
        }

        .animate-scroll-down {
          animation: scroll-down 1.5s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
