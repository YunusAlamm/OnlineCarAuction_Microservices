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
        accessToken: string;
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
            issuer: process.env.ID_URL,
            authorization: { params: { scope: "openid profile auctionApp" } },
            idToken: true
        })
    ],
    pages: {
        signIn: '/'
    },
    callbacks: {
        async jwt({ token, profile, account }) {
            if(account && account.access_token) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.username = profile.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.username = token.username as string;
                session.accessToken = token.accessToken as string;
            }
            return session;
        }
    }
}

const handler = NextAuth(config);

export const signIn = handler.signIn;
export const signOut = handler.signOut;
export const auth = async () => {
    const session = await getServerSession(config);
    return session;
}

export { handler as GET, handler as POST };