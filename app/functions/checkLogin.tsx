import { ComponentType } from "react";
import PleaseLogin from "../src/components/modals/plsLogin";

export default function useCheckLogin(Component: ComponentType) {
  return function ProtectedRoute({ ...props }) {
    const isLogin = sessionStorage.getItem("access");

    // 로그인이 되어 있지 않다면 로딩 화면을 보여줍니다.
    if (!isLogin) {
      return <PleaseLogin />;
    }

    return <Component {...props} />;
  };
}
