'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { X } from 'lucide-react'

const SITE_NAME = 'AI Traveller Planner'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { data: session } = useSession()
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
        className="fixed top-0 left-0 bottom-0 w-72 max-w-[85vw] bg-white shadow-xl z-50 md:z-[60] flex flex-col"
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-slate-800">{SITE_NAME}</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <Link
            href="/chat"
            onClick={onClose}
            className="px-4 py-3 rounded-lg font-medium bg-[rgb(0,191,165)] text-white hover:opacity-90 transition-opacity"
          >
            New Chat
          </Link>
          <p className="text-sm text-slate-500 mt-2 px-2">Past Chats</p>
          {pastChats.length === 0 ? (
            <p className="text-sm text-slate-400 px-2">No chats yet</p>
          ) : (
            <ul className="space-y-1">
              {pastChats.map((chat) => (
                <li key={chat.id}>
                  <Link
                    href={`/chat?id=${chat.id}`}
                    onClick={onClose}
                    className="block px-4 py-2 rounded-lg hover:bg-slate-100 text-slate-700"
                  >
                    {chat.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-auto p-4">
          <Link
            href="/"
            onClick={onClose}
            className="block text-center text-[rgb(0,191,165)] font-medium"
          >
            {SITE_NAME} — Home
          </Link>
        </div>
      </aside>
    </>
  )
}
