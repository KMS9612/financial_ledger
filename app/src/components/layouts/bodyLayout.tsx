"use client";
import { useEffect, useState } from "react";
import Header from "../header";
import Navigation from "../navigation";
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

  const Fonts = inter + " " + notoKR;

  useEffect(() => {
    const hiddenLayout = ["/"];

    setIsHidden(
      hiddenLayout.filter((el) => currentPath === el).length > 0 ? true : false
    );
  }, [currentPath]);

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
