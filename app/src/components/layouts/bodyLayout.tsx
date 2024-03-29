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
      className={`${props.notoFont} relative m-auto w-screen h-screen m-h-screen bg-gray-300 flex flex-col justify-start items-center overflow-x-hidden`}
      style={{ minWidth: "380px", margin: "0 auto" }}
    >
      <Navigation></Navigation>
      {!isHidden ? (
        <div className="absolute w-full">
          <Header></Header>
        </div>
      ) : (
        <></>
      )}
      {props.children}
    </body>
  );
}
