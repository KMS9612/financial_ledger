import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const needUnLoginPage = ["/login", "/signup"];
  const needLoginPage = ["/result", "/edit"];
  const accessToken = request.cookies.get("access");

  // 회원가입 후 데이터 저장 프로세스 및 resultPage리팩토링으로  signup페이지 접근제한
  if (pathname === "/signup") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (needUnLoginPage.includes(pathname) && accessToken) {
    console.log(`redirect :from ${pathname} :to result`);
    return NextResponse.redirect(new URL("/result", request.url));
  }
  if (needLoginPage.includes(pathname) && !accessToken) {
    console.log(`redirect :from ${pathname} :to login`);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return;
}

export const config = {
  matcher: ["/result", "/edit", "/login", "/signup"],
};
