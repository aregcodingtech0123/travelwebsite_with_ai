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
        // Call your backend to validate credentials and return user
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/auth/login`, {
          method: 'POST',
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
          headers: { 'Content-Type': 'application/json' },
        })
        if (!res.ok) return null
        const data = await res.json()
        return { id: data.id, email: data.email, name: data.name ?? '' }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        // Optional: sync Google user to your DB via backend
        return true
      }
      return true
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub ?? undefined
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
}
