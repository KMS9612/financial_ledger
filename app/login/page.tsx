"use client";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";
import LoginErrModal from "../src/components/modals/loginErrModal";
import CircleLoading from "../src/components/loading/circleLoading";
import LoginForm from "../src/components/pages/login/loginForm";
import { postLogin } from "../src/service/postLogin";
import LoginBtnWrap from "../src/components/pages/login/loginBtnWrap";
import LoginLeftDeco from "../src/components/pages/login/loginLeftDeco";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../src/schema/loginSchema/loginFormSchema";
import { LoginFormData } from "../src/types/loginTypes/loginFormTypes";

export default function LoginPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const inputData = [
    {
      labelName: "Email",
      type: "email",
      id: "id",
    },
    {
      labelName: "PassWord",
      type: "password",
      id: "pw",
    },
  ];

  useEffect(() => {
    setIsLoading(true);
  }, []);

  // 로그인 버튼 클릭시 로그인 요청을 보내는 함수
  const onClickLogin = async (test: boolean, data: LoginFormData | null) => {
    const email = test ? "test@naver.com" : data?.id;
    const password = test ? "test" : data?.pw;

    if (!email || !password) return;

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
    event.stopPropagation();
    event.preventDefault();
    onClickLogin(true, null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({ resolver: yupResolver(loginFormSchema) });

  const onSubmit = handleSubmit((data) => {
    onClickLogin(false, data);
  });
  return (
    <div className="w-full h-full bg-gray-200 flex justify-center items-center">
      <LoginErrModal text={errText} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-5/6 h-5/6 rounded-xl flex shadow-xl overflow-hidden animate-fade animate-once">
        <LoginLeftDeco />
        {isLoading ? (
          <form
            onSubmit={onSubmit}
            className="lg:w-1/3 w-full h-full bg-white flex flex-col justify-center items-center border-4 border-white py-20 gap-20"
          >
            <h2 className="text-2xl text-slate-600 font-bold">Welcome!</h2>
            {/* Login Form */}
            <LoginForm
              inputData={inputData}
              register={register}
              errors={errors}
            />
            {/* Login Form Btns */}
            <LoginBtnWrap
              setValue={setValue}
              loginLoading={loginLoading}
              onClickLogin={onClickLogin}
              onClickTestAccountLogin={onClickTestAccountLogin}
            />
          </form>
        ) : (
          <div className="lg:w-1/3 w-full h-full flex justify-center items-center">
            <CircleLoading />
          </div>
        )}
      </div>
    </div>
  );
}
