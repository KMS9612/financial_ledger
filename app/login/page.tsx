"use client";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import LoginErrModal from "../src/components/modals/loginErrModal";
import CircleLoading from "../src/components/loading/circleLoading";
import LoginForm from "../src/components/pages/login/loginForm";
import { postLogin } from "../src/service/postLogin";
import LoginBtnWrap from "../src/components/pages/login/loginBtnWrap";

export default function LoginPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const idRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const inputData = [
    {
      labelName: "Email",
      type: "email",
      id: "id",
      ref: idRef,
    },
    {
      labelName: "PassWord",
      type: "password",
      id: "pw",
      ref: pwRef,
    },
  ];

  useEffect(() => {
    setIsLoading(true);
  }, []);

  // 로그인 버튼 클릭시 로그인 요청을 보내는 함수
  const onClickLogin = async (test: boolean) => {
    const email = test ? "test@naver.com" : idRef.current?.value;
    const password = test ? "test" : pwRef.current?.value;

    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }
    setLoginLoading(true);

    try {
      const params = { email, password };
      const response = await postLogin(params);
      // jwt토큰과 유저정보는 sessionCookie에 저장
      Cookie.set("access", response?.accessToken);
      Cookie.set("refresh", response?.refreshToken);
      Cookie.set("email", email);
      sessionStorage.setItem("email", response?.email);
      router.replace("/result");
    } catch (err: any) {
      setErrText(
        err.response
          ? err.response.data.message
          : "알 수 없는 에러가 발생 했습니다. 다시 시도 해 주세요"
      );
      setIsOpen(true);
      setLoginLoading(false);
    }
  };

  const onClickTestAccountLogin = async (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation;
    onClickLogin(true);
  };

  return (
    <div className="w-full h-full bg-gray-200 flex justify-center items-center">
      <LoginErrModal text={errText} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-5/6 h-5/6 rounded-xl flex shadow-xl overflow-hidden">
        <div
          className="lg:flex hidden w-2/3 h-full flex flex-col gap-3 justify-center items-center bg-gradient-to-r
        from-slate-200
        via-blue-300
        to-slate-500 background-animate"
        >
          <p className="text-5xl text-white">Welcome To GGB!</p>
          <p className="text-2xl text-white">Let&rsquo;s Start Economize!</p>
        </div>
        {isLoading ? (
          <div className="lg:w-1/3 w-full h-full bg-white flex flex-col justify-center items-center border-4 border-white py-20 gap-20">
            <h2 className="text-2xl text-slate-600 font-bold">Welcome!</h2>
            {/* Login Form */}
            <LoginForm inputData={inputData} />
            {/* Login Form Btns */}
            <LoginBtnWrap
              loginLoading={loginLoading}
              onClickLogin={onClickLogin}
              onClickTestAccountLogin={onClickTestAccountLogin}
            />
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <CircleLoading />
          </div>
        )}
      </div>
    </div>
  );
}
