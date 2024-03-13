import prisma from '@/lib/prisma'
import { AuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

import * as bcrypt from "bcrypt";

import NextAuth from 'next-auth/next';

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "User name",
                    type: "text",
                    placeholder: "Enter your username"
                },
                password: {
                    label: "Password",
                    type: "password",
                }
            },

            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                  where: {
                    email: credentials?.username,
                  },
                })
                if (!user) throw new Error("User name or password is not correct");

                if (!credentials?.password) throw new Error("Please Provide Your Password");
                // This is Naive Way of Comparing The Passwords
                // const isPassowrdCorrect = credentials?.password === user.password;
                const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password);

                if (!isPasswordCorrect) throw new Error("User name or password is incorrect");

                const { password, ...userWithoutPass } = user;
                return userWithoutPass;
            },

        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }