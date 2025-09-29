import NextAuth from "next-auth";
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

export const { auth, signIn, signOut } = handler;
export { handler as GET, handler as POST };