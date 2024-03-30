"use client";
import { useEffect, useState } from "react";
import Header from "../header";
import Navigation from "../navigation";
import { usePathname } from "next/navigation";

interface IPropsBodyLayout {
  interFont: string;
  children: React.ReactNode;
  notoFont: string;
}
export default function BodyLayout(props: IPropsBodyLayout) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const currentPath = usePathname();
  const Fonts = props.notoFont + " " + props.interFont;

  useEffect(() => {
    const hiddenLayout = ["/"];

    setIsHidden(
      hiddenLayout.filter((el) => currentPath === el).length > 0 ? true : false
    );
  }, [currentPath]);

  return (
    <body
      className={`${Fonts} relative m-auto w-screen h-screen m-h-screen flex flex-col justify-start items-center overflow-x-hidden`}
      style={{ minWidth: "380px", margin: "0 auto" }}
    >
      <Navigation></Navigation>
      {!isHidden && <Header></Header>}
      {props.children}
    </body>
  );
}
