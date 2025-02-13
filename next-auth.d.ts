/* library check data in static ways based on types and edit schema */
import NextAuth from 'next/auth'
import { DefaultSession } from 'next-auth'


declare module 'next-auth' {
    interface User {
        id: string;
      }
    
      interface Session extends DefaultSession {
        user?: User;
      }
}