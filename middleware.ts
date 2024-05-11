import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const needUnLoginPage = ["/login", "signup"];
  const needLoginPage = ["/result", "/edit"];
  const accessToken = request.cookies.get("access");

  if (needUnLoginPage.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL("/result", request.url));
  }
  if (needLoginPage.includes(pathname) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/result", "/edit", "/login", "/signup"],
};
