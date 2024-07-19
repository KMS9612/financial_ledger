"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import Navigation from "./navigation";
import { usePathname } from "next/navigation";
import { RecoilRoot } from "recoil";
import { Inter } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";

interface IPropsBodyLayout {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });
const notoKR = Noto_Sans_KR({ subsets: ["latin"] });

export default function BodyLayout(props: IPropsBodyLayout) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const currentPath = usePathname();
  const Fonts = inter.className + " " + notoKR.className;

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
  }, [currentPath]);

  return (
    <RecoilRoot>
      <body
        className={`${Fonts} w-screen h-screen m-h-screen justify-center items-center overflow-x-hidden p-10 bg-gray-100`}
        style={{ minWidth: "380px", margin: "0 auto" }}
      >
        <div className="grid grid-cols-12 w-full h-full rounded-lg overflow-hidden shadow-2xl bg-white">
          <div className={`${isHidden && "hidden"} col-span-2`}>
            <Navigation />
          </div>
          {/* {!isHidden && <Header />} */}
          <div
            className={`${
              isHidden ? "col-span-12" : "col-span-10 p-2"
            } overflow-auto`}
          >
            {props.children}
          </div>
        </div>
      </body>
    </RecoilRoot>
  );
}
