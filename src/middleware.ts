import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to login page
  if (pathname === "/login") {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const session = request.cookies.get("session")?.value

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Verify session
  const payload = await decrypt(session)
  if (!payload || !payload.user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (login page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
}
