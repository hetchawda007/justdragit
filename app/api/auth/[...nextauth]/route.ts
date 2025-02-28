import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/connnectDB";
import User from "@/models/User";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log("User:", user);
            console.log("Account:", account);
            console.log("Profile:", profile);
            const email = user.email
            const username = user.name
            await connectDB()
            const isuser = await User.findOne({ email: email })
            if (!isuser) {
                const newUser = new User({
                    email: email,
                    username: username
                })
                await newUser.save()
            }
            return true
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as POST, handler as GET };