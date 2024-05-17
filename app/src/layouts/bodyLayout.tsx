"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import Navigation from "./navigation";
import { usePathname } from "next/navigation";
import { RecoilRoot, useResetRecoilState } from "recoil";
import { Inter } from "next/font/google";
import { Noto_Sans_KR } from "next/font/google";
import { isOpenModal } from "../recoil/store/isOpenModal";

interface IPropsBodyLayout {
  children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });
const notoKR = Noto_Sans_KR({ subsets: ["latin"] });

export default function BodyLayout(props: IPropsBodyLayout) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const currentPath = usePathname();
  const Fonts = inter.className + " " + notoKR.className;
  const resetModalState = useResetRecoilState(isOpenModal);

  useEffect(() => {
    const hiddenLayout = ["/", "/login", "/signup"];

    setIsHidden(
      hiddenLayout.filter((el) => currentPath === el).length > 0 ? true : false
    );
    // fix, today모달 창을 킨 상태로 해당 모달을 사용하는 페이지로 이동하면 켜져있는 상태가 유지되는 걸 막기위한 resetState
    resetModalState();
  }, [currentPath, resetModalState]);

  return (
    <RecoilRoot>
      <body
        className={`${Fonts} relative mx-auto w-screen h-screen m-h-screen flex flex-col justify-start items-center overflow-x-hidden`}
        style={{ minWidth: "380px", margin: "0 auto" }}
      >
        <Navigation></Navigation>
        {!isHidden && <Header></Header>}
        {props.children}
      </body>
    </RecoilRoot>
  );
}
