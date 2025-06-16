import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  
  const isAuth = !!token
  const isLogin = req.nextUrl.pathname === "/login"

  if (!isAuth && !isLogin) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (isAuth && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
