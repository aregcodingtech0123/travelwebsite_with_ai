import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Use internal Docker network URL on the server, fall back to public URL or localhost
        const backendBaseUrl =
          process.env.BACKEND_URL ??
          process.env.NEXT_PUBLIC_API_URL ??
          'http://localhost:8080'

        const res = await fetch(`${backendBaseUrl}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        if (!res.ok) {
          // Invalid credentials or backend error
          return null
        }

        const data = await res.json()
        if (!data?.id || !data?.email) {
          return null
        }

        return {
          id: data.id,
          email: data.email,
          name: data.name ?? '',
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        // Sync Google user to backend database
        try {
          const backendBaseUrl =
            process.env.BACKEND_URL ??
            process.env.NEXT_PUBLIC_API_URL ??
            'http://localhost:8080'

          const name = user.name ?? ''
          const [firstName, ...rest] = name.split(' ')
          const lastName = rest.join(' ').trim() || undefined

          await fetch(`${backendBaseUrl}/api/auth/oauth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              firstName: firstName || undefined,
              lastName,
            }),
          })
        } catch (err) {
          console.error('Failed to sync Google user to backend:', err)
        }
        return true
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as { id?: string }).id = token.sub ?? undefined
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) token.sub = user.id
      return token
    },
  },
  pages: {
    signIn: '/login',
  },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NEXTAUTH_DEBUG === 'true',
}
