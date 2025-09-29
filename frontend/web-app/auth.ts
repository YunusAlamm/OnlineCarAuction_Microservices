import NextAuth, { getServerSession } from "next-auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"

export const config = {
    providers: [
        DuendeIDS6Provider({
            id:'id-server',
            clientId: "nextApp",
            clientSecret: "secret",
            issuer: "http://localhost:5001",
            authorization: {params: {scope: "openid profile auctionApp"}},
            idToken: true
        })
    ]
}

const handler = NextAuth(config);

// For client components
export const { signIn, signOut } = handler;

// For server components
export const auth = async () => await getServerSession(config);

// For API route
export { handler as GET, handler as POST };