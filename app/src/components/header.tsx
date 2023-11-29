"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const hidden = ["/edit"];
  const path = usePathname();
  const router = useRouter();

  if (hidden.includes(path)) {
    return;
  }
  return (
    <div className="absolute w-full h-12 bg-slate-700 flex justify-between items-center p-8 ">
      <div className="container flex items-center ">
        <Image
          className="cursor-pointer"
          src="/logo.png"
          alt=""
          width={36}
          height={36}
        ></Image>
      </div>
      <button
        onClick={() => {
          router.push("/edit");
        }}
        className="w-96 h-8 rounded bg-white text-lg font-bold hover:bg-gray-300 transition ease-in-out  hover:-translate-y-1"
      >
        체험하기
      </button>
    </div>
  );
}
