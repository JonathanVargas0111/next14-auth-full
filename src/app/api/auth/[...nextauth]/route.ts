// Importa el cliente Prisma para interactuar con la base de datos
import prisma from '@/lib/prisma'

// Importa AuthOptions y CredentialsProvider de next-auth para configurar la autenticación
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Importa bcrypt para comparar las contraseñas
import * as bcrypt from "bcrypt";

// Importa NextAuth para inicializar la autenticación
import NextAuth from 'next-auth/next';
import { User } from '@prisma/client';

// Configuración de opciones de autenticación
export const authOptions: AuthOptions = {

    pages: {
        signIn: "/auth/signin",
    },
    
    providers: [
        // Proveedor de credenciales para autenticación personalizada
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

            // Función de autorización que verifica las credenciales del usuario
            async authorize(credentials) {
                // Busca el usuario en la base de datos usando el email (username) proporcionado
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username,
                    },
                })
                // Si el usuario no existe, arroja un error
                if (!user) throw new Error("User name or password is not correct");

                // Si no se proporciona la contraseña, arroja un error
                if (!credentials?.password) throw new Error("Please Provide Your Password");

                // Compara la contraseña proporcionada con la contraseña almacenada del usuario
                const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password);

                // Si la contraseña no es correcta, arroja un error
                if (!isPasswordCorrect) throw new Error("User name or password is incorrect");

                // Si las credenciales son válidas, devuelve el usuario sin la contraseña
                const { password, ...userWithoutPass } = user;
                return userWithoutPass;
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user as User;
            return token;
        },

        async session({ token, session }) {
            session.user = token.user;
            return session;
        },
    },
}

// Inicializa NextAuth con las opciones de autenticación
const handler = NextAuth(authOptions)

// Exporta los controladores GET y POST para el enrutamiento de Next.js
export { handler as GET, handler as POST }
