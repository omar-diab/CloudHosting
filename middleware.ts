import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log(request, 'middledfwerfwe tctw')
  const jwtToken = request.cookies.get('jwtToken');

  const token = jwtToken?.value as string;

  if (!token) {
    if(request.nextUrl.pathname.startsWith('/api/users/profile/')) {
      return NextResponse.json(
        { message: "No Token Provided, access denied" },
        { status: 401 } // Unauthorized
      );
    }
  } else {
    if(request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

}

export const config = {
  matcher: ["/api/users/profile/:path*", '/login', '/register'],
};
