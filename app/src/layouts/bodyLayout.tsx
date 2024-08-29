"use client";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import MobileNavi from "./mbNavigation";
import { useRecoilState } from "recoil";
import { isDarkState } from "../recoil/store/isDark";

interface IPropsBodyLayout {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });
const notoKR = Noto_Sans_KR({ subsets: ["latin"] });

export default function BodyLayout(props: IPropsBodyLayout) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const currentPath = usePathname();
  const Fonts = inter.className + " " + notoKR.className;

  const checkTheme = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  };

  useEffect(() => {
    const allPath = [
      "/",
      "/login",
      "/signup",
      "/edit",
      "/result",
      "/noDataPage",
    ];
    const hiddenLayout = ["/", "/login", "/signup", "/noDataPage"];

    if (allPath.includes(currentPath)) {
      setIsHidden(
        hiddenLayout.filter((el) => currentPath === el).length > 0
          ? true
          : false
      );
    }
    if (currentPath.startsWith("/edit")) {
      setIsHidden(false);
    }

    checkTheme();
  }, [currentPath]);

  return (
    <body
      className={`${
        isDark ? "dark bg-stone-900" : "bg-gray-100"
      } ${Fonts} min-w-[380px] mx-auto relative w-screen h-screen flex justify-center items-center`}
    >
      <div className="grid grid-cols-12 w-full h-full rounded-lg shadow-2xl bg-white z-10">
        {/* DesktopNavigation */}
        {!isHidden && (
          <div className={`xl:block hidden col-span-2`}>
            <Navigation />
          </div>
        )}

        {/* {!isHidden && <Header />} */}
        {/* Mounted Components */}
        <div
          className={`${
            isHidden ? "col-span-12" : "col-span-12 xl:col-span-10 px-2"
          } w-full h-full flex justify-center items-center dark:bg-stone-700`}
        >
          {props.children}
        </div>
        {/* MobileNavigation */}
        {!isHidden && (
          <div className={`xl:hidden col-span-12 w-full`}>
            <MobileNavi />
          </div>
        )}
      </div>
    </body>
  );
}
