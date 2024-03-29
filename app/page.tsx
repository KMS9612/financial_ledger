"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        className={`bg-gradient-to-r
        from-lime-500
        via-red-500
        to-slate-500 background-animate w-full h-screen scroll-smooth`}
      >
        <div className="w-full h-full flex justify-center items-center bg-gray-500 opacity-[0.8]">
          <div className="h-full flex flex-col justify-center items-center gap-4">
            <h2 className="font-bold text-6xl text-white">Financial Book</h2>
            <p className="text-gray-300 font-bold text-3xl opacity-1">
              Write, Read, Economize
            </p>
            <button
              onClick={() => router.push("/login")}
              className="w-full h-12 border rounded text-white font-bold hover:bg-gray-300"
            >
              Login
            </button>
            {/* <button className="w-full h-12 border rounded text-white font-bold hover:bg-gray-300">
              About
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
