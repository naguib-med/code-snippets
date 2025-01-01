import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

export type { Session } from "next-auth";
