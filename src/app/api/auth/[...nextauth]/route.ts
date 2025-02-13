import NextAuth, { NextAuthOptions } from 'next-auth'
import prisma from '@/app/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import GoogleProvider from 'next-auth/providers/google'
//import GithubProvider from 'next-auth/providers/github'
//import NaverProvider from 'next-auth/providers/naver'

//console.log(prisma)

export const authOptions: NextAuthOptions = {

    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24,
        updateAge: 60 * 60 *2,
    },
    secret: process.env.NEXTAUTH_SECRET,
    adapter:PrismaAdapter(prisma),
    providers: [
        // OAuth authentication providers
        GoogleProvider({
        clientId: process.env.GOOGLE_SECRET_ID || '',
        clientSecret: process.env.GOOGLE_SECRET_KEY || '',
        })
    ],
    pages: {
        signIn:'/login'
    },
    callbacks: {
        //deliver data to server
        //update session and user data
        session: ({session, token}) => ({
            ...session,
            user:{
                ...session.user,
                id:token.sub,
            }
        }),
        //식별 토큰 : jwt - id
        jwt: async({token, user}) => {
            if(user) {
                //json web token's subject
                console.log({user, token})
                token.sub=user.id
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }