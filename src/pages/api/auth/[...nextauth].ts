import NextAuth from "next-auth";
import { authOptions } from "flight-plan/server/auth";

export default NextAuth(authOptions);
