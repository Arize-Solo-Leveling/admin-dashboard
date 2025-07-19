import { NextRequest, NextResponse } from "next/server";

export function middleware(request : NextRequest){
    const token = request.cookies.get("token")?.value;

    const protectedPaths  = ["/dashboard"];
    const pathname = request.nextUrl.pathname;


    const isProtected  = protectedPaths.some(path => pathname.startsWith(path));

    if(isProtected && !token){
        const loginUrl  = new URL('/login', request.url);
        return  NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};