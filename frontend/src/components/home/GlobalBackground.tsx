import { LandmarkIcon } from "@/src/components/icons/LandmarkIcon"
import { landmarks } from "@/src/data/landmarks"

interface GlobalBackgroundProps {
  scrollY: number
}

export const GlobalBackground = ({ scrollY }: GlobalBackgroundProps) => {
  const parallaxOffset = scrollY * 0.25
  
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Soft Gradient Horizon */}
      <div 
        className="absolute inset-x-0 top-0 h-[60vh] bg-gradient-to-b from-sky-200/50 via-blue-100/30 to-transparent dark:from-sky-950/50 dark:via-blue-950/30 dark:to-transparent"
        style={{ transform: `translateY(${parallaxOffset * 0.4}px)` }}
      />
      
      {/* Floating Landmarks - Spanning entire site */}
      <div className="absolute inset-0">
        {landmarks.map((landmark, idx) => {
          const moveDistance = (parallaxOffset * (0.4 + idx * 0.08)) % 100
          const opacity = Math.max(0.1, 0.5 - (scrollY / 2000)) // Reduced fade-out rate
          
          return (
            <div
              key={landmark.id}
              className="absolute transition-opacity duration-700"
              style={{
                left: `${landmark.x}%`,
                top: `${landmark.y}%`,
                transform: `translate(-50%, calc(-50% + ${moveDistance}px))`,
                opacity: opacity,
              }}
            >
              <LandmarkIcon 
                type={landmark.type} 
                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 text-sky-600/30 dark:text-sky-400/20" 
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
