import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./prisma"
import { Adapter } from "next-auth/adapters"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id,
      }
      return session
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
}
