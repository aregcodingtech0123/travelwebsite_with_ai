// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import type { LanguageCode } from "@/src/i18n/types"
// // import { languageMetadata } from "@/src/i18n/languages"

// // interface PageShellProps {
// //   children: React.ReactNode
// //   language: LanguageCode
// //   setLanguage: (lang: LanguageCode) => void
// //   isLoading: boolean
// // }

// // export const PageShell = ({ 
// //   children, 
// //   language, 
// //   setLanguage, 
// //   isLoading 
// // }: PageShellProps) => {
// //   return (
// //     <>
// //       {/* Global Language Selector - Top Right */}
// //       <div className="fixed top-6 right-6 z-50">
// //         <div className="relative">
// //           {/* Backdrop Glow */}
// //           <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-cyan-400/20 rounded-lg blur-sm opacity-60" />
          
// //           <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300/60 dark:border-slate-700/60 rounded-lg shadow-lg">
// //             <Select 
// //               value={language} 
// //               onValueChange={(val) => setLanguage(val as LanguageCode)} 
// //               disabled={isLoading}
// //             >
// //               <SelectTrigger className="w-40 h-10 border-0 bg-transparent">
// //                 <SelectValue placeholder="Select language" />
// //               </SelectTrigger>
// //               <SelectContent align="end" className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
// //                 {languageMetadata.map((lang) => (
// //                   <SelectItem key={lang.code} value={lang.code}>
// //                     <div className="flex items-center gap-3 py-1">
// //                       <span className="text-xl">{lang.flag}</span>
// //                       <span className="font-medium">{lang.name}</span>
// //                     </div>
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //         </div>
// //       </div>

// //       {children}
// //     </>
// //   )
// // }



// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import type { LanguageCode } from "@/src/i18n/types"
// import { languageMetadata } from "@/src/i18n/languages"

// interface PageShellProps {
//   children: React.ReactNode
//   language: LanguageCode
//   setLanguage: (lang: LanguageCode) => void
//   isLoading: boolean
// }

// export const PageShell = ({ 
//   children, 
//   language, 
//   setLanguage, 
//   isLoading 
// }: PageShellProps) => {
//   return (
//     <>
//       {/* Global Language Selector - Top Right - Glassmorphic Design */}
//       <div className="fixed top-6 right-6 z-50">
//         <div className="relative">
//           {/* Subtle Backdrop Glow - Reduced for better integration */}
//           <div className="absolute -inset-1 bg-gradient-to-r from-sky-400/10 via-blue-400/10 to-cyan-400/10 rounded-lg blur-sm opacity-40" />
          
//           {/* Glassmorphic Container - Semi-transparent with white border */}
//           <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/40 rounded-lg shadow-lg">
//             <Select 
//               value={language} 
//               onValueChange={(val) => setLanguage(val as LanguageCode)} 
//               disabled={isLoading}
//             >
//               <SelectTrigger className="w-40 h-10 border-0 bg-transparent hover:bg-white/5 transition-colors">
//                 <SelectValue placeholder="Select language" />
//               </SelectTrigger>
//               <SelectContent 
//                 align="end" 
//                 className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/40"
//               >
//                 {languageMetadata.map((lang) => (
//                   <SelectItem 
//                     key={lang.code} 
//                     value={lang.code}
//                     className="hover:bg-white/10 dark:hover:bg-white/5 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-3 py-1">
//                       <span className="text-xl">{lang.flag}</span>
//                       <span className="font-medium text-white">{lang.name}</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {children}
//     </>
//   )
// }


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { LanguageCode } from "@/src/i18n/types"
import { languageMetadata } from "@/src/i18n/languages"

interface PageShellProps {
  children: React.ReactNode
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  isLoading: boolean
}

// Flag icon URLs from Flaticon (Freepik)
const flagIcons: Record<LanguageCode, string> = {
  en: "https://cdn-icons-png.flaticon.com/512/197/197374.png", // UK flag
  tr: "https://cdn-icons-png.flaticon.com/512/197/197518.png", // Turkey flag
  de: "https://cdn-icons-png.flaticon.com/512/197/197571.png", // Germany flag
  es: "https://cdn-icons-png.flaticon.com/512/197/197593.png", // Spain flag
  fr: "https://cdn-icons-png.flaticon.com/512/197/197560.png", // France flag
}

export const PageShell = ({ 
  children, 
  language, 
  setLanguage, 
  isLoading 
}: PageShellProps) => {
  return (
    <>
      {/* Global Language Selector - Top Right */}
      <div className="fixed top-6 right-6 z-50 bg-white">
        <div className="relative">
          {/* Solid background with glassmorphism */}
          <div className="relative bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 rounded-lg shadow-lg">
            <Select 
              value={language} 
              onValueChange={(val) => setLanguage(val as LanguageCode)} 
              disabled={isLoading}
            >
              <SelectTrigger className="w-40 h-10 border-0 bg-transparent hover:bg-white/5 transition-colors">
                <SelectValue placeholder="Select language">
                  <div className="flex items-center gap-2">
                    <img 
                      src={flagIcons[language]} 
                      alt="" 
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span className="font-medium">
                      {languageMetadata.find(l => l.code === language)?.name}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent 
                align="end" 
                className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40"
              >
                {languageMetadata.map((lang) => (
                  <SelectItem 
                    key={lang.code} 
                    value={lang.code}
                    className="hover:bg-white/10 dark:hover:bg-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 py-1">
                      <img 
                        src={flagIcons[lang.code]} 
                        alt="" 
                        className="w-4 h-4 rounded-full object-cover"
                      />
                      <span className="font-medium">{lang.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {children}
    </>
  )
}