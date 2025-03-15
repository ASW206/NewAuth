import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db/prismaClient";
import { PrismaAdapter } from "@auth/prisma-adapter";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      authorize: async (credentials: any) => {
        // Add your user authentication logic here
        const email = credentials.email;
        const password = credentials.password;
        const user = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });
        const dbPassword = user?.password;
        if (!user || password !== dbPassword) {
          return null;
        }
        return user;
      },
    }),
    Google,
  ],
  callbacks:{
    async session({session,user}){
      session.user.id =user.id;
      return session;
    }
  }
  
});

