import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useCheckLogin() {
  const [isLogin, setIsLogin] = useState("");
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access") || "";
    setIsLogin(accessToken);

    // 로그인이 되어 있지 않다면 에러 화면을 보여줍니다.
    if (!accessToken) {
      router.push("/errorPage");
    }
  });
}
