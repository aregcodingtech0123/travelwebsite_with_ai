import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export interface TravelPlan {
  title: string
  days: Array<{
    day: number
    activities: string[]
  }>
}

interface ResultsSectionProps {
  travelPlan: TravelPlan
  t: (key: string) => string
}

export const ResultsSection = ({ travelPlan, t }: ResultsSectionProps) => {
  return (
    <div className="relative z-10">
      <section className="relative z-10 px-6 md:px-12 lg:px-16 py-24 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-100/30 dark:from-transparent dark:via-slate-900/50 dark:to-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/15 via-blue-400/15 to-cyan-400/15 dark:from-sky-600/25 dark:via-blue-600/25 dark:to-cyan-600/25 rounded-2xl blur-2xl"/>
            
            <Card className="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/60 shadow-2xl overflow-hidden">
              
              {/* Header */}
              <div className="relative bg-gradient-to-br from-sky-500/10 via-blue-500/10 to-cyan-500/10 dark:from-sky-600/20 dark:via-blue-600/20 dark:to-cyan-600/20">
                <CardHeader className="pb-8">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    {travelPlan.title}
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                    {t('results.subtitle')}
                  </CardDescription>
                </CardHeader>
              </div>

              <CardContent className="pt-10 pb-12">
                <div className="space-y-14">
                  {travelPlan.days.map((day, dayIdx) => (
                    <div 
                      key={day.day}
                      className="space-y-6"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${dayIdx * 0.1}s both`,
                      }}
                    >
                      {/* Day Header */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30">
                          <span className="text-2xl font-bold">{day.day}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                          {t('results.day')} {day.day}
                        </h3>
                      </div>

                      {/* Activities */}
                      <div className="space-y-5 pl-20">
                        {day.activities.map((activity, idx) => (
                          <div 
                            key={idx}
                            className="flex items-start gap-4 group"
                          >
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 dark:from-sky-900/50 dark:to-blue-900/50 border-2 border-sky-300 dark:border-sky-700 flex items-center justify-center mt-1 group-hover:scale-110 transition-transform">
                              <div className="w-2.5 h-2.5 rounded-full bg-sky-500"/>
                            </div>
                            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                              {activity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
