import { withAuth } from "next-auth/middleware"

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname)
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
        pages: {
            signIn: 'api/auth/signin'
        }
    }
)

export const config = {
    matcher: [
        '/session'
    ]
}