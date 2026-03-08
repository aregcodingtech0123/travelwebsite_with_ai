'use client'

import { MapPin, Plane, Compass, Globe } from 'lucide-react'

const ITEMS = [
  {
    icon: MapPin,
    text: 'Discover personalized routes tailored to your interests.',
  },
  {
    icon: Plane,
    text: 'Get the best flight and stay recommendations.',
  },
  {
    icon: Compass,
    text: 'Navigate like a local with AI-powered tips.',
  },
  {
    icon: Globe,
    text: 'Explore the world with confidence and ease.',
  },
]

export function IncentivesSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 dark:text-white mb-16">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {ITEMS.map(({ icon: Icon, text }) => (
            <div
              key={text.slice(0, 20)}
              className="group p-8 rounded-2xl text-center transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                color: '#374151',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 text-slate-400 group-hover:text-white transition-colors duration-300 bg-slate-200 dark:bg-slate-600">
                <Icon className="w-8 h-8" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
