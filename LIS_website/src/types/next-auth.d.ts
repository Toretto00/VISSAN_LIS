import "next-auth"
import type { User } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: User
  }

  interface User {
    name: string
    store: string
    token: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {
    accessTokenExpires: number
  }
}
