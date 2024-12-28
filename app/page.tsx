"use client";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsLogin(Cookie.get("access") ? true : false);
  }, []);

  const sqlTestBtn = () => {
    axios({ url: "/api/test", method: "post" });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div
        className={`bg-gradient-to-r
        from-lime-500
        via-red-500
        to-slate-500 background-animate w-full h-screen scroll-smooth`}
      >
        <div className="w-full h-full flex justify-center items-center bg-gray-500 opacity-[0.8]">
          <div className="h-full flex flex-col justify-center items-center gap-4">
            <h2 className="font-bold text-6xl text-white text-center animate-jump-in animate-once">
              Financial Book
            </h2>
            <p className="text-gray-300 font-bold text-3xl opacity-1 animate-jump-in animate-once animate-delay-100">
              Write, Read, Economize
            </p>
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="w-3/4 sm:w-full h-12 border rounded text-white font-bold hover:bg-gray-300 animate-jump-in animate-once animate-delay-200"
            >
              {isLogin ? "Go Result" : "Login"}
            </button>
            {/* <button className="w-full h-12 border rounded text-white font-bold hover:bg-gray-300">
              About
            </button> */}
            <button onClick={() => sqlTestBtn()}>SQL Test Button</button>
          </div>
        </div>
      </div>
    </div>
  );
}
