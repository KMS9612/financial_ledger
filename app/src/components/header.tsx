"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "./recoil/navi";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);

  return (
    <div className="sticky top-0 w-full h-14 min-h-14 bg-slate-700 flex justify-between items-center px-6 z-10">
      <div className="container flex items-center ">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          onClick={() => router.push("/")}
        ></Image>
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-60 h-8 rounded bg-white text-lg font-bold hover:bg-gray-300 transition ease-in-out hover:-translate-y-1"
      >
        Menu
      </button>
    </div>
  );
}
