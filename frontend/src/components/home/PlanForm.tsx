// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// interface PlanFormProps {
//   city: string
//   setCity: (city: string) => void
//   isLoading: boolean
//   error: string
//   onSubmit: () => void
//   t: (key: string) => string
// }

// export const PlanForm = ({ city, setCity, isLoading, error, onSubmit, t }: PlanFormProps) => {
//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="relative">
//         {/* Card Glow */}
//         <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/25 via-blue-400/25 to-cyan-400/25 dark:from-sky-600/35 dark:via-blue-600/35 dark:to-cyan-600/35 rounded-2xl blur-xl opacity-80"/>
        
//         <Card className="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/60 shadow-2xl">
//           <CardHeader className="space-y-3 pb-6">
//             <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white">
//               {t('form.title')}
//             </CardTitle>
//             <CardDescription className="text-base text-slate-600 dark:text-slate-400">
//               {t('form.description')}
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <div className="space-y-6">
//               {/* Destination Input */}
//               <div className="space-y-2">
//                 <Label htmlFor="city" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                   {t('form.destination.label')}
//                 </Label>
//                 <Input
//                   id="city"
//                   type="text"
//                   placeholder={t('form.destination.placeholder')}
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
//                   className="h-12 text-base bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-sky-500 dark:focus:border-sky-400"
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
//                   <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <Button
//                 onClick={onSubmit}
//                 className="w-full h-12 text-base font-semibold bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white shadow-lg shadow-sky-500/30 dark:shadow-sky-500/20 transition-all duration-300"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
//                     <span>{t('form.button.loading')}</span>
//                   </div>
//                 ) : (
//                   t('form.button.submit')
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }


// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"

// interface PlanFormProps {
//   city: string
//   setCity: (city: string) => void
//   isLoading: boolean
//   error: string
//   onSubmit: () => void
//   t: (key: string) => string
// }

// export const PlanForm = ({ city, setCity, isLoading, error, onSubmit, t }: PlanFormProps) => {
//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="relative">
//         {/* Card Glow */}
//         <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/25 via-blue-400/25 to-cyan-400/25 dark:from-sky-600/35 dark:via-blue-600/35 dark:to-cyan-600/35 rounded-2xl blur-xl opacity-80"/>
        
//         <Card className="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/60 shadow-2xl">
//           <CardHeader className="space-y-3 pb-6">
//             {/* Title with gradient overlay */}
//             <div className="relative inline-block">
//               <div className="absolute inset-0 bg-black/30 rounded-lg" />
//               <CardTitle className="text-3xl font-bold text-slate-900 dark:text-white relative font-black">
//                 {t('form.title')}
//               </CardTitle>
//             </div>
//             <CardDescription className="text-base text-slate-600 dark:text-slate-400">
//               {t('form.description')}
//             </CardDescription>
//           </CardHeader>

//           <CardContent>
//             <div className="space-y-6">
//               {/* Destination Input */}
//               <div className="space-y-2">
//                 <Label htmlFor="city" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
//                   {t('form.destination.label')}
//                 </Label>
//                 <Input
//                   id="city"
//                   type="text"
//                   placeholder={t('form.destination.placeholder')}
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
//                   className="h-12 text-base bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:border-transparent rounded-xl placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200"
//                   disabled={isLoading}
//                 />
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
//                   <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
//                 </div>
//               )}

//               {/* Submit Button */}
//               <div className="flex justify-center">
//                 <Button
//                   onClick={onSubmit}
//                   className="w-64 h-12 text-base font-semibold bg-gradient-to-r from-indigo-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white shadow-lg transition-all duration-300 hover:scale-105"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <div className="flex items-center gap-2">
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
//                       <span>{t('form.button.loading')}</span>
//                     </div>
//                   ) : (
//                     t('form.button.submit')
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }




import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { useState } from 'react';
interface PlanFormProps {
  city: string
  setCity: (city: string) => void
  isLoading: boolean
  error: string
  onSubmit: () => void
  t: (key: string) => string
}



export const PlanForm = ({ city, setCity, isLoading, error, onSubmit, t }: PlanFormProps) => {


  const [isHovered, setIsHovered] = useState(false)

  const idleStyle = {
    backgroundColor: '#00BFA5', // Sabit Turkuaz
    boxShadow: '0 4px 14px 0 rgba(0,191,165,0.39)',
    transform: 'scale(1)',
    transition: 'all 0.3s ease',
  }

  const hoverStyle = {
    backgroundColor: '#00BFA5', // Renk değişmiyor
    boxShadow: '0 6px 20px rgba(0,191,165,0.23)',
    transform: 'scale(1.02)', // Çok hafif bir büyüme
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        {/* Card Glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/25 via-blue-400/25 to-cyan-400/25 dark:from-sky-600/35 dark:via-blue-600/35 dark:to-cyan-600/35 rounded-2xl blur-xl opacity-80"/>
        
        <Card className="relative bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-slate-200/60 dark:border-slate-700/60 shadow-2xl">
          <CardHeader className="space-y-3 pb-6">
            {/* Title with gradient overlay */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-black/30 rounded-lg" />
              <CardTitle className="text-3xl font-bold text-slate-900 text-white relative font-white">
                {t('form.title')}
              </CardTitle>
            </div>
            {/* Make description white and bold */}
            <CardDescription className="text-base text-white dark:text-white font-semibold">
              {t('form.description')}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {/* Destination Input */}
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t('form.destination.label')}
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder={t('form.destination.placeholder')}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                  className="h-12 text-base bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all duration-200 focus:border-[#00BFA5] focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50">
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Submit Button: consistent gradient + white bold text */}
              <div className="flex justify-center">
                <Button
                  onClick={onSubmit}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={isHovered ? hoverStyle : idleStyle}
                  className="w-64 h-12 text-base font-bold text-white rounded-lg active:scale-95 disabled:opacity-50 disabled:scale-100"                  disabled={isLoading}
                >

                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                      <span>{t('form.button.loading')}</span>
                    </div>
                  ) : (
                    t('form.button.submit')
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}