"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "../recoil/store/navi";
import NaviOpenBtn from "../components/commons/buttons/naviOpenBtn";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);

  return (
    <div className="top-0 w-full h-12 min-h-[50px] bg-slate-500 flex justify-between items-center px-6 z-10">
      <div className="container flex items-center ">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          alt="가계부 페이지 로고아이콘, 클릭시 첫 페이지로 이동"
          width={36}
          height={36}
          onClick={() => router.replace("/")}
        ></Image>
      </div>
      <NaviOpenBtn setIsOpen={setIsOpen} />
    </div>
  );
}
