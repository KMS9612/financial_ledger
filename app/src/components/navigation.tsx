"use client";
import { useRecoilState } from "recoil";
import { isOpenNavi } from "./recoil/navi";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useRecoilState(isOpenNavi);
  const router = useRouter();
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
        <div className="w-5/6 h-32 flex flex-col justify-center text-white font-bold items-center gap-4 border rounded">
          로그인이 필요합니다.
          <button className="w-5/6 h-8 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700">
            로그인
          </button>
        </div>
        <div className="w-5/6 border rounded flex flex-col jutify-center text-white font-bold items-center gap-6 py-6">
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/edit");
            }}
            className="w-5/6 h-12 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
          >
            작성
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/result");
            }}
            className="w-5/6 h-12 border-2 rounded transition ease-in-out hover:-translate-y-1 hover:bg-white hover:text-slate-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
