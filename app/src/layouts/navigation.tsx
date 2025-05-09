"use client";
import Cookie from "js-cookie";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "../recoil/store/navi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NaviCloseBtn from "../components/commons/buttons/naviCloseBtn";
import { useChangeStateOfModals } from "../lib/hooks/useChangeStateOfModals";
import { INaviItem } from "../types/layout/navigation/naviItemsType";
import FixPayModal from "../components/modals/fixPayModal";
import TodayPayModal from "../components/modals/todayPayModal";
import { naviItems } from "./naviItem";
import { isDarkState } from "../recoil/store/isDark";

export default function Navigation() {
  // const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);
  const [isLogin, setIsLogin] = useState<string | null>();
  const [email, setEmail] = useState("");
  const { isOpen, changeModalState } = useChangeStateOfModals();
  const [isDark, setIsDark] = useRecoilState(isDarkState);

  const router = useRouter();

  useEffect(() => {
    // const loginData: string | null = sessionStorage.getItem("access");
    const userEmail = sessionStorage.getItem("email") || "";
    const loginData = Cookie.get("access");
    setIsLogin(loginData);
    setEmail(userEmail);

    if (loginData === null || !loginData) {
      router.push("/login");
    }
  }, [isOpen, router]);

  const onClickLogout = () => {
    if (!isLogin) {
      router.push("/login");
    } else {
      Cookie.remove("access");
      Cookie.remove("refresh");
      Cookie.remove("email");
      router.push("/login");
    }
  };

  const handleNaviItemEvent = (
    isModal: boolean,
    route: string | undefined,
    modalType: "edit" | "today" | undefined
  ) => {
    if (isModal && modalType) {
      changeModalState(modalType, !isOpen[modalType]);
    }

    if (!isModal && route) {
      router.push(route);
    }
    return;
  };

  const onClickToggleDarkMode = () => {
    localStorage.setItem("theme", isDark ? "white" : "dark");
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`h-full bg-gray-400 dark:bg-stone-800 transition-all duration-700 p-2 z-20`}
    >
      <FixPayModal />
      <TodayPayModal />
      {/* <NaviCloseBtn setIsOpen={setIsOpen} /> */}
      <div className="m-h-4/6 mx-auto mt-2 flex flex-col justify-start items-center gap-10 ">
        <div className="w-5/6 h-32 flex flex-col justify-center text-white font-bold items-center gap-4 border rounded">
          {!isLogin ? `로그인이 필요합니다.` : `${email}`}
          <button
            onClick={onClickLogout}
            className="w-5/6 h-8 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
          >
            {!isLogin ? `로그인` : `로그아웃`}
          </button>
        </div>
        <div className="w-5/6 border rounded flex flex-col jutify-center text-white font-bold items-center gap-6 py-6">
          {naviItems.map((el) => (
            <button
              key={el.itemName}
              onClick={() =>
                handleNaviItemEvent(el.isModal, el.route, el.modalType)
              }
              className="w-5/6 h-12 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
            >
              {el.itemName}
            </button>
          ))}
        </div>
        <button
          onClick={onClickToggleDarkMode}
          className="w-5/6 h-8 text-white font-bold border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
        >
          {isDark ? "Light" : "Dark"}
        </button>
      </div>
    </div>
  );
}
