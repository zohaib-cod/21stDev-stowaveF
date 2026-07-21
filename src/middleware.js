import { NextResponse } from 'next/server';

export function middleware(request) {
  // Cookies se login token check karna
  const sessionToken = request.cookies.get('stowave_admin_session')?.value;
  const currentPath = request.nextUrl.pathname;
  const secureBasePath = "/i/t/s/a/d/m/i/n/admin";

  // AGAR: User admin portal par jana chahta hai, login page par NAI hai, aur token bhi NAI hai
  if (currentPath.startsWith(secureBasePath) && !currentPath.endsWith('/login') && !sessionToken) {
    // Usay direct secure login page par bounce kar do
    return NextResponse.redirect(new URL(`${secureBasePath}/login`, request.url));
  }

  return NextResponse.next();
}

// Yeh matcher middleware ko fast rakhta hai, sirf admin paths par check lagata hai
export const config = {
  matcher: ['/i/t/s/a/d/m/i/n/admin/:path*'],
};
