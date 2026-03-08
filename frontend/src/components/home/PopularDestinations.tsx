// "use client"

// import { useState } from "react"
// import type { LanguageCode } from "@/src/i18n/types"
// import { destinations } from "@/src/data/destinations"

// interface PopularDestinationsProps {
//   language: LanguageCode
//   t: (key: string) => string
// }

// export const PopularDestinations = ({ language, t }: PopularDestinationsProps) => {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const itemsPerPage = 3

//   const totalPages = Math.ceil(destinations.length / itemsPerPage)
//   const currentDestinations = destinations.slice(
//     currentIndex * itemsPerPage,
//     (currentIndex + 1) * itemsPerPage
//   )

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % totalPages)
//   }

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
//   }

//   const handleDestinationClick = (slug: string) => {
//     // In a real app, this would use Next.js router
//     window.location.href = `/destinations/${slug}`
//   }

//   return (
//     <section className="relative py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-white/70 via-slate-50/50 to-white/70 dark:from-slate-950/70 dark:via-slate-900/50 dark:to-slate-950/70">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
//             Popular Destinations
//           </h2>
//           <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
//             Discover the world's most captivating cities
//           </p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative">
          
//           {/* Left Arrow */}
//           <button
//             onClick={goToPrevious}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
//             aria-label="Previous destinations"
//           >
//             <svg 
//               className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           {/* Cards Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
//             {currentDestinations.map((destination, idx) => (
//               <article
//                 key={destination.id}
//                 onClick={() => handleDestinationClick(destination.slug)}
//                 className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5] shadow-lg hover:shadow-2xl transition-shadow duration-500"
//                 style={{
//                   animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both`,
//                 }}
//               >
//                 {/* Background Image */}
//                 <div 
//                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                   style={{ backgroundImage: `url(${destination.image})` }}
//                 />

//                 {/* Gradient Overlay (always visible, subtle) */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

//                 {/* Hover Overlay */}
//                 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                 {/* Animated Border */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                   <div className="absolute inset-0 animate-border-travel">
//                     <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
//                     <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-white to-transparent" />
//                     <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-transparent via-white to-transparent" />
//                     <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-transparent via-white to-transparent" />
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
//                   {/* City Name - Always Visible */}
//                   <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
//                     {destination.name}
//                   </h3>

//                   {/* Description - Visible on Hover */}
//                   <p className="text-base md:text-lg text-white/90 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
//                     {destination.description}
//                   </p>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* Right Arrow */}
//           <button
//             onClick={goToNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
//             aria-label="Next destinations"
//           >
//             <svg 
//               className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>

//         {/* Pagination Dots */}
//         <div className="flex justify-center gap-2 mt-12">
//           {Array.from({ length: totalPages }).map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setCurrentIndex(idx)}
//               className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//                 idx === currentIndex
//                   ? 'bg-slate-800 dark:bg-slate-200 w-8'
//                   : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
//               }`}
//               aria-label={`Go to page ${idx + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


"use client"

import { useState } from "react"
import type { LanguageCode } from "@/src/i18n/types"
import { destinations } from "@/src/data/destinations"

interface PopularDestinationsProps {
  language: LanguageCode
  t: (key: string) => string
}

export const PopularDestinations = ({ language, t }: PopularDestinationsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3

  const totalPages = Math.ceil(destinations.length / itemsPerPage)
  const currentDestinations = destinations.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  )

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const handleDestinationClick = (slug: string) => {
    // In a real app, this would use Next.js router
    window.location.href = `/destinations/${slug}`
  }

  return (
    <>
      <style jsx>{`
        /* Typography: Cormorant Garamond (serif) for headings + Inter (sans) for body
           - Cormorant: Premium editorial feel, used by high-end travel publications
           - Inter: Clean, readable, modern - perfect for UI elements
           - Combination creates sophisticated travel aesthetic */
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        /* Border travel animation: Smooth clockwise motion around card perimeter
           - 0.7s duration: Fast enough to feel premium, slow enough to be elegant
           - Cubic-bezier easing: Subtle deceleration creates cinematic quality */
        @keyframes border-travel {
          0% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
          }
          25% {
            clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          }
          50% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
          }
          75% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          }
        }
        
        /* Fade-in scale: Staggered card entrance animation */
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-border-travel {
          animation: border-travel 0.7s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        .font-heading {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <section className="relative py-24 px-6 md:px-12 lg:px-16 bg-gradient-to-b from-white/70 via-slate-50/50 to-white/70 dark:from-slate-950/70 dark:via-slate-900/50 dark:to-slate-950/70">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header - Left-aligned with decorative line */}
          <div className="mb-16 flex items-center gap-6">
            <h2 className="font-body text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
              Discover the world's most captivating cities
              
            </h2>
            
            {/* Decorative line extending to right edge */}
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 via-slate-200 to-transparent dark:from-slate-600 dark:via-slate-700 dark:to-transparent" />
          </div>

          {/* Carousel Container */}
          <div className="relative">
            
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous destinations"
            >
              <svg 
                className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {currentDestinations.map((destination, idx) => (
                <article
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination.slug)}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/5] shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  style={{
                    animation: `fadeInScale 0.5s ease-out ${idx * 0.1}s both`,
                  }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />

                  {/* Gradient Overlay (always visible, subtle) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated Border - Enhanced with traveling line effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute inset-0 animate-border-travel">
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/90 to-transparent" />
                      <div className="absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-white/90 to-transparent" />
                      <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-white/90 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-[2px] h-full bg-gradient-to-t from-transparent via-white/90 to-transparent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                    {/* City Name - Always Visible - Serif typography for elegance */}
                    <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 transform transition-transform duration-500 group-hover:translate-y-0">
                      {destination.name}
                    </h3>

                    {/* Description - Visible on Hover - Sans-serif for readability */}
                    <p className="font-body text-base md:text-lg text-white/90 leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
                      {destination.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-700/60 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
              aria-label="Next destinations"
            >
              <svg 
                className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-slate-800 dark:bg-slate-200 w-8'
                    : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                }`}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}