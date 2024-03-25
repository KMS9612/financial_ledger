"use client";
import { useEffect, useState } from "react";
import Header from "../header";
import Navigation from "../navigation";
import { usePathname } from "next/navigation";

interface IPropsBodyLayout {
  children: React.ReactNode;
  notoFont: string;
}
export default function BodyLayout(props: IPropsBodyLayout) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const currentPath = usePathname();
  useEffect(() => {
    const hiddenLayout = ["/"];

    setIsHidden(
      hiddenLayout.filter((el) => currentPath === el).length > 0 ? true : false
    );
  }, [currentPath]);

  return (
    <body
      className={`${props.notoFont} relative m-auto w-screen m-h-screen flex flex-col justify-start items-center overflow-x-hidden`}
      style={{ minWidth: "380px", margin: "0 auto" }}
    >
      {!isHidden ? (
        <div className="w-full">
          <Header></Header>
          <Navigation></Navigation>
        </div>
      ) : (
        <></>
      )}
      {props.children}
    </body>
  );
}
