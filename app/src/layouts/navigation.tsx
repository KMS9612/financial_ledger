"use client";
import Cookie from "js-cookie";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "../recoil/store/navi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NaviCloseBtn from "../components/commons/buttons/naviCloseBtn";

export default function Navigation() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);
  const [isLogin, setIsLogin] = useState<string | null>();
  const router = useRouter();

  useEffect(() => {
    // const loginData: string | null = sessionStorage.getItem("access");
    const loginData = Cookie.get("access");
    setIsLogin(loginData);

    if (loginData === null || !loginData) {
      router.push("/login");
    }
  }, [isOpen, router]);
  const onClickLogout = () => {
    if (!isLogin) {
      setIsOpen(false);
      router.push("/login");
    } else {
      Cookie.remove("access");
      Cookie.remove("refresh");
      Cookie.remove("email");
      router.push("/login");
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`${
        isOpen ? "-translate-x-0" : "w-[0px] translate-x-96"
      } w-[400px] fixed h-full bg-slate-600 transition-all duration-700 top-0 right-0 p-2 z-20`}
    >
      <NaviCloseBtn setIsOpen={setIsOpen} />
      <div className="m-h-4/6 mx-auto mt-2 flex flex-col justify-start items-center gap-10 ">
        <div className="w-5/6 h-32 flex flex-col justify-center text-white font-bold items-center gap-4 border rounded">
          {!isLogin ? `로그인이 필요합니다.` : `환영합니다!`}
          <button
            onClick={onClickLogout}
            className="w-5/6 h-8 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
          >
            {!isLogin ? `로그인` : `로그아웃`}
          </button>
        </div>
        <div className="w-5/6 border rounded flex flex-col jutify-center text-white font-bold items-center gap-6 py-6">
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/edit");
            }}
            className="w-5/6 h-12 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
          >
            작성
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/result");
            }}
            className="w-5/6 h-12 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
