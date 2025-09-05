import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
    // Add SAAS middleware logic here
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}
