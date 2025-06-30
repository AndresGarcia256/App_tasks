import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userModel } from "@/models/User.js";
import connectDB from "@/app/lib/db.js";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }

            },
            async authorize(credentials, req) {
                await connectDB();
                const userFound = await userModel.findOne({ email: credentials?.email });
                if (!userFound) throw new Error("Credenciales incorrectas");
                const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password)
                if (!passwordMatch) throw new Error("Credenciales incorrectas");
                
                console.log("Usuario encontrado:", userFound);
                return userFound;
            },
                
            }),
        ],
        callbacks: {
            jwt({token, user}) {
                if (user) {
                    token.user = user;
                }
                return token;

            },
            session({session, token}) {
                session.user = token.user as any;
                return session; 

            }
        }
});

export { handler as GET, handler as POST };

