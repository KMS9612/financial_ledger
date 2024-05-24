import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const needUnLoginPage = ["/login", "/signup"];
  const needLoginPage = ["/result", "/edit"];
  const accessToken = request.cookies.get("access");

  console.log("middleware is running", pathname, accessToken?.value);

  if (needUnLoginPage.includes(pathname) && accessToken) {
    console.log(`redirect :from ${pathname} :to result :access ${accessToken}`);
    return NextResponse.redirect(new URL("/result", request.url));
  }
  if (needLoginPage.includes(pathname) && !accessToken) {
    console.log(`redirect :from ${pathname} :to login :access ${accessToken}`);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return;
}

export const config = {
  matcher: ["/result", "/edit", "/login", "/signup"],
};
