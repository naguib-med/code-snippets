import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authOptions);

export type { Session } from "next-auth";
