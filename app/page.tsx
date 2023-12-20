"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const boxArr = [
    {
      title: "환영합니다!",
      subText: `해당 가계부는 Next.js, TypeScript, TailWindCss, Vercel을 활용해 개발, 배포되었습니다.`,
      path: "/login",
    },
    {
      title: "작성하기!",
      subText: `이번달의 수입, 고정지출, 변동수입, 변동지출 등을 입력하는 페이지로 이동 할 수 있습니다.
        작성 후 대시보드에서 이전 데이터와 비교한 값을 확인 할 수 있습니다.`,
      path: "/edit",
    },
    {
      title: "확인하기",
      subText: `여태까지 작성해온 기록들을 확인하며 비교하는 데이터를 볼 수 있는 페이지입니다.
         이전 데이터와 비교해 어떤 부분에서 지출이 더 나갔는지 확인하세요!`,
      path: "/result",
    },
  ];
  const router = useRouter();

  const onClickRoute = (path: string) => {
    router.push(path);
  };
  return (
    <div
      style={{ backgroundColor: "#708D81" }}
      className="w-full h-full flex flex-col justify-center items-center gap-12"
    >
      {boxArr.map((el, index) => {
        return (
          <div
            key={index + el.title + el.subText}
            onClick={() => {
              onClickRoute(el.path);
            }}
            className="w-4/5 h-1/6 flex bg-white rounded p-6 cursor-pointer transition ease-in-out hover:-translate-y-1"
          >
            <div className="w-5/6">
              <h2 className="text-3xl">{el.title}</h2>
              <div className="flex justify-between">
                <span>{el.subText}</span>
              </div>
            </div>
            <div className="w-1/6 flex justify-end items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="32"
                  viewBox="0 0 512 512"
                >
                  <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z" />
                </svg>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
