import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useEffect } from "react";

export default function useCheckLogin(router: AppRouterInstance) {
  useEffect(() => {
    const path = window.location.pathname;
    const needLessLogin = ["/login", "/signup"];
    const isLogin = sessionStorage.getItem("access");
    // 로그인되어 있을 경우 로그인 페이지이면 메인으로 로그인페이지가 아니라면 진입되도록 제작
    if (needLessLogin.includes(path)) {
      if (isLogin) {
        router.push("/");
        return;
      }
    } else {
      if (!isLogin) {
        router.push("/");
        return;
      }
    }
  }, []);
}
