"use client";
import { useRouter } from "next/navigation";

export default function PleaseLogin() {
  const router = useRouter();
  return (
    <div className="relativew-full h-screen bg-slate-300">
      <div className="absolute flex flex-col justify-between gap-4 w-[380px] h-[250px] top-1/2 left-1/2 w-1/5 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-4">
        {/* Head */}
        <h2 className="text-xl h-[20px] font-bold">알림</h2>
        {/* Body */}
        <div className="flex w-full flex-col justify-center items-center">
          <p className="font-bold">로그인이 필요한 페이지 입니다.</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => router.push("/login")}
            className="w-full h-[40px] border-2 border-slate-500 rounded-md font-bold transition ease-in-out hover:-translate-y-1"
          >
            로그인
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full border-2 border-slate-300 rounded-md transition ease-in-out hover:-translate-y-1"
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
}
