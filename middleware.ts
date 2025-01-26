import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const userRole = request.cookies.get("userRole")?.value
    const path = request.nextUrl.pathname

    // Admin routes protection
    if (path.startsWith("/admin")) {
        if (userRole !== "admin") {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    // User dashboard protection
    if (path === "/dashboard") {
        if (!userRole) {
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
}

