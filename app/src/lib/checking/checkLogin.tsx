// middelWare로 로그인 권한분기를 실행함으로 더 이상 사용하지 않는 함수 입니다.

// export default function checkLogin(request: NextRequest, pathname: string) {
//   const rawCookie = request.headers.get("cookie");
//   const Cookies = CookieParsing(rawCookie);
//   const access = Cookies.access;

//   const needLoginPage = ["/result", "/edit"];
//   const needUnLoginPage = ["/", "/login", "/signup"];

//   if (!access && needLoginPage.includes(pathname)) {
//     return "needLogin";
//   }
//   if (access && needUnLoginPage.includes(pathname)) {
//     return "needLogout";
//   }
// }

// function CookieParsing(rawCookie: any) {
//   const Cookie: any = {};
//   rawCookie?.split(";").forEach((el: any) => {
//     const [key, value] = el.split("=").map((c: any) => c.trim());
//     Cookie[key] = value;
//   });
//   return Cookie;
// }
