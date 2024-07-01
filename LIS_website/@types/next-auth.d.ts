import NextAuth from "next-auth"

declare module "next-auth" {
    
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      store: object
      token: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    store: object
      token: string
      role: string
  }
}