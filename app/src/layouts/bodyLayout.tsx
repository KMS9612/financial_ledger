"use client";
import { useEffect, useState } from "react";
import Navigation from "./navigation";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import MobileNavi from "./mbNavigation";
import { useRecoilState, useRecoilValue } from "recoil";
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
    const allPath = ["/", "/login", "/signup", "/edit", "/result"];
    const hiddenLayout = ["/", "/login", "/signup"];

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
      } ${Fonts} relative w-screen h-screen justify-center items-center overflow-x-hidden overflow-y-auto p-10`}
      style={{ minWidth: "380px", margin: "0 auto" }}
    >
      <div className="grid grid-cols-12 w-full h-full rounded-lg overflow-hidden shadow-2xl bg-white z-10">
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
            isHidden ? "col-span-12" : "col-span-12 xl:col-span-10 p-2"
          } w-full h-full overflow-auto dark:bg-stone-700`}
        >
          {props.children}
        </div>
        {/* MobileNavigation */}
        {!isHidden && (
          <div className={`xl:hidden col-span-12 w-full h-full`}>
            <MobileNavi />
          </div>
        )}
      </div>
    </body>
  );
}
