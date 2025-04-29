import { NextResponse } from "next/server";

// Middleware ini hanya berjalan di route yang ditentukan di config
export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Jika user mencoba mengakses /dashboard atau anaknya tanpa token
  if (pathname.startsWith("/dashboard") && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Tentukan route mana yang akan diintersepsi
export const config = {
  matcher: ["/dashboard/:path*"], // Cakup semua sub-path dari /dashboard
};
