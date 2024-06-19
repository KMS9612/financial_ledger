"use client";
import { usePathname, useRouter } from "next/navigation";
import GradientBtn from "./src/components/commons/buttons/gradientBtn";

export default function Not_found() {
  const pathname = usePathname();
  const router = useRouter();

  const startAnimate = "animate-jump-in animate-once";

  const notFoundHead = "페이지를 찾을 수 없습니다!";
  const notFoundBody1 =
    "죄송합니다.요청하신 페이지를 찾을 수 없습니다. URL을 제대로 입력했는지 다시 확인 해 주세요!";
  const notFoundBody2 = `위의 경로가 맞는 경로인지 확인 해 주세요!`;

  return (
    <div className="container h-screen m-auto">
      <div className="w-full h-full flex flex-col justify-center items-center gap-10 text-center">
        {/* Head Text */}
        <h2
          className={`${startAnimate} animate-delay-100 font-bold text-4xl text-gray-600`}
        >
          {notFoundHead}
        </h2>
        {/* BodyText */}
        <div
          className={`${startAnimate} animate-delay-200 text-center flex flex-col gap-4`}
        >
          <p className={`text-gray-400`}>{notFoundBody1}</p>
          <p className={`text-gray-500`}>{pathname}</p>
          <p className={`text-gray-400`}>{notFoundBody2}</p>
        </div>
        {/* Button Wrap */}
        <div className={`${startAnimate} animate-delay-300 w-[150px]`}>
          <GradientBtn
            btnInnerText={"Home"}
            onClickEvent={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
}
