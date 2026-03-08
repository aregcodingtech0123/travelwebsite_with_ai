'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { X, MessageSquarePlus, Home, Clock } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { data: session } = useSession()
  const { t } = useLanguage()
  
  // In a real app, fetch past chats from API
  const pastChats: { id: string; title: string }[] = []

  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 md:z-[60]"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white shadow-2xl z-50 md:z-[60] flex flex-col"
        role="dialog"
        aria-label="Sidebar"
        data-testid="sidebar"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <span className="font-bold text-slate-800">{t('site.name')}</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
            aria-label={t('sidebar.close')}
            data-testid="sidebar-close-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <Link
            href="/chat"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold bg-brand text-white hover:opacity-90 transition-opacity"
            data-testid="sidebar-new-chat"
          >
            <MessageSquarePlus className="w-5 h-5" />
            {t('sidebar.newChat')}
          </Link>
        </div>

        {/* Past Chats Section */}
        <div className="flex-1 px-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{t('sidebar.pastChats')}</span>
          </div>
          
          {pastChats.length === 0 ? (
            <p className="text-sm text-slate-400 px-2 py-4 text-center bg-slate-50 rounded-lg">
              {t('sidebar.noChats')}
            </p>
          ) : (
            <ul className="space-y-1">
              {pastChats.map((chat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat?id=${chat.id}`}
                    onClick={onClose}
                    className="block px-4 py-2.5 rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    {chat.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center justify-center gap-2 text-brand font-medium hover:opacity-80 transition-opacity"
            data-testid="sidebar-home-link"
          >
            <Home className="w-5 h-5" />
            {t('sidebar.home')}
          </Link>
        </div>
      </aside>
    </>
  )
}
