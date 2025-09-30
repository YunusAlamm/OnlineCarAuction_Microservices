import NextAuth, { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";


declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email: string;
        }
        expires: string;
    }
    interface Profile {
        username: string;
    }
    interface JWT {
        username?: string;
    }
}

export const config: AuthOptions = {
    providers: [
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: "http://localhost:5001",
            authorization: { params: { scope: "openid profile auctionApp" } },
            idToken: true
        })
    ],
    callbacks: {
        async jwt({ token, profile }) {
            if (profile) {
                token.username = profile.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.username = token.username as string;
                
            }
            return session;
        }
    }
}

const handler = NextAuth(config);

export const signIn = handler.signIn;
export const signOut = handler.signOut;
export const auth = () => getServerSession(config);

export { handler as GET, handler as POST };