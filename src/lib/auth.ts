import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import prisma from "./prisma";

export const authOptions: AuthOptions = {
    
    providers: [
        CredentialsProvider({
            name: "",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials){
                try{
                    const user = await prisma.user.findUnique({
                        where: { email: credentials?.email , password: credentials?.password},
                        select: { id: true, email: true},
                    });
                    
                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    return user
                }catch (e: unknown) {
                    if (e instanceof Error) {
                        throw new Error(e.message);
                    } else {
                        throw new Error("An unknown error occurred"); 
                    }
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || " ",
            clientSecret: process.env.GITHUB_SECRET || " "
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { id: user.id };
            return { id: token.id };
        },  
        async session({ session, token }) {
            session.user = { id: token.id };
            return session;
        },      
        async redirect({ url, baseUrl }) {
            if (url === baseUrl || url === "/") {
                return `${baseUrl}/blogs`;
            }
            return url.startsWith(baseUrl) ? url : baseUrl;
        },
    },
        
    session: {
        strategy: "jwt"
    },
    pages:{
        signIn: "/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
