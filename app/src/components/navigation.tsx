"use client";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "./recoil/navi";

export default function Navigation() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);
  console.log(isOpen);
  return (
    <div
      className={`absolute w-96 h-screen bg-slate-600 transition duration-300 ease-in-out right-0 z-20 ${
        isOpen ? "-translate-x-0" : "translate-x-96 "
      }`}
    >
      <button
        className="rounded border-4 w-full mb-8 bg-white text-slate-600 font-bold cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Close
      </button>
      <div className="container h-4/6 mx-auto flex flex-col justify-start items-center gap-10 ">
        <div className="w-5/6 h-32 flex flex-col justify-start items-center gap-4 border rounded">
          로그인이 필요합니다.
          <button className="w-5/6 h-8 border-2 rounded">로그인</button>
        </div>
        <div className="w-5/6 h-4/6 border rounded">페이지 이동</div>
      </div>
    </div>
  );
}
