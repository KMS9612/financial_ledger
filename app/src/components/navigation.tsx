"use client";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "./recoil/navi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);
  const [isLogin, setIsLogin] = useState<string | null>();
  const router = useRouter();

  useEffect(() => {
    const loginData: string | null = sessionStorage.getItem("access");
    setIsLogin(loginData);
  }, []);

  return (
    <div
      className={`fixed h-full bg-slate-600 transition duration-300 ease-in-out top-0 right-0 z-20 ${
        isOpen ? "w-96 -translate-x-0" : "w-0 translate-x-96 "
      }`}
    >
      <button
        className="rounded border-4 w-full mb-8 bg-white text-slate-600 font-bold cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Close
      </button>
      <div className="m-h-4/6 mx-auto flex flex-col justify-start items-center gap-10 ">
        <div className="w-5/6 h-32 flex flex-col justify-center text-white font-bold items-center gap-4 border rounded">
          {!isLogin ? `로그인이 필요합니다.` : `환영합니다!`}
          <button
            onClick={() => {
              if (!isLogin) {
                setIsOpen(false);
                router.push("/login");
              } else {
                setIsOpen(false);
                sessionStorage.removeItem("access");
                sessionStorage.removeItem("refresh");
                router.push("/login");
              }
            }}
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
