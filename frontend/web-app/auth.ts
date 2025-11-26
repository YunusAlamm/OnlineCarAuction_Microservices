import NextAuth from "next-auth";
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

type TokenShape = Record<string, unknown> & { accessToken?: string; username?: string };
type SessionShape = { user?: { username?: string } } & Record<string, unknown>;

export const config = {
    providers: [
        // cast provider config to any to avoid typing mismatches with the beta provider types
        // Configure the provider so:
        // - browser redirects use the public ID_URL (what users access on host)
        // - server/token exchanges use ID_URL_INTERNAL (Docker DNS) so the container can reach the identity server
        DuendeIDS6Provider({
            id: 'id-server',
            clientId: process.env.ID_CLIENT ?? "nextApp",
            clientSecret: process.env.ID_SECRET ?? "secret",
            // Use the public issuer value (this must match the discovery issuer property)
            issuer: process.env.ID_URL,
            authorization: {
                params: { scope: "openid profile auctionApp" },
                // Browser should be redirected to the publicly reachable identity server
                url: `${process.env.ID_URL}/connect/authorize`
            },
            // Token and userinfo endpoints should point to the internal DNS name so container can reach them
            token: {
                url: `${process.env.ID_URL_INTERNAL}/connect/token`
            },
            userinfo: {
                url: `${process.env.ID_URL_INTERNAL}/connect/userinfo`
            }
        })
    ],
    pages: {
        signIn: '/'
    },
    // Enable debug to get detailed server logs during sign-in/callback flows
    debug: true,
    // In containerized or proxied setups the incoming Host may differ; allow enabling
    // trusting the host via env `TRUST_AUTH_HOST=true` for development/docker.
    // In production prefer to set `AUTH_URL`/`NEXTAUTH_URL` correctly instead.
    trustHost: process.env.TRUST_AUTH_HOST === 'true' || process.env.NODE_ENV !== 'production',
    callbacks: {
        async redirect({ url, baseUrl }: { url: string; baseUrl: string }){
            return url.startsWith(baseUrl) ? url : baseUrl
        },
        async jwt({ token, profile, account }: { token: TokenShape; profile?: { username?: string }; account?: { access_token?: string } }) {
            if (account && account.access_token) {
                token.accessToken = account.access_token;
            }
            if (profile) {
                token.username = profile.username;
            }
            return token as unknown;
        },
        async session({ session, token }: { session: SessionShape; token: TokenShape }) {
            if (token && session.user) {
                session.user.username = token.username as string;
                (session as Record<string, unknown>).accessToken = token.accessToken as string;
            }
            return session as unknown;
        }
    }
}

const { handlers, auth: nextAuth, signIn: nextSignIn, signOut: nextSignOut } = NextAuth(config as unknown as Parameters<typeof NextAuth>[0]);

export const auth = nextAuth;
export const signIn = nextSignIn;
export const signOut = nextSignOut;

export const GET = handlers.GET;
export const POST = handlers.POST;