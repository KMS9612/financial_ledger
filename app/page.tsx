"use client";
import { useRouter } from "next/navigation";
import MainNaviBox from "./src/components/box/mainNaviBox";
import { WheelEvent, useEffect, useRef, useState } from "react";

export default function Home() {
  const [isScrollOver, setIsScrollOver] = useState<boolean>(false);
  const scrollWrapRef = useRef<HTMLDivElement | null>(null);
  const secWrapRef = useRef<HTMLDivElement | null>(null);

  const boxArr = [
    {
      title: "작성하기!",
      subText: `이번달의 수입, 고정지출, 변동수입, 변동지출 등을 입력하는 페이지로 이동 할 수 있습니다.
        작성 후 대시보드에서 이전 데이터와 비교한 값을 확인 할 수 있습니다.`,
      path: "/edit",
    },
    {
      title: "확인하기!",
      subText: `여태까지 작성해온 기록들을 확인하며 비교하는 데이터를 볼 수 있는 페이지입니다.
         이전 데이터와 비교해 어떤 부분에서 지출이 더 나갔는지 확인하세요!`,
      path: "/result",
    },
  ];
  const router = useRouter();

  const onClickRoute = (path: string) => {
    router.push(path);
  };

  const onWheelAnimation = (event: WheelEvent<HTMLDivElement>) => {
    setIsScrollOver(false);
    // 휠 이벤트 발생 시 스크롤 위치 계산
    const scrollWrap = scrollWrapRef.current;
    if (scrollWrap !== null) {
      const chilren = scrollWrap.children.length - 1;
      const containerWidth = scrollWrap.clientWidth;
      const scrollLeft = scrollWrap.scrollLeft;
      const delta = Math.max(-1, Math.min(1, event.deltaY)); // 휠 이벤트에서 변화량 계산
      const scrollStep = containerWidth; // 스크롤 이동 거리 계산

      // 3번째 화면까지 이동했을때 fixed해제 (구현하기)
      if (scrollLeft == containerWidth * chilren) {
        setIsScrollOver(true);
      }

      // 오른쪽으로 스크롤
      if (delta > 0) {
        scrollWrap.scrollTo({
          left: scrollLeft + scrollStep,
          behavior: "smooth",
        });
      }
      // 왼쪽으로 스크롤 (원하는 동작이 없다면 이 부분은 생략 가능)
      else if (delta < 0) {
        scrollWrap.scrollTo({
          left: scrollLeft - scrollStep,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div
        ref={scrollWrapRef}
        className={`${
          isScrollOver ? "block" : "fixed"
        } hide_scroll w-full h-screen text-white bg-slate-700 font-bold text-5xl flex overflow-scroll snap-mandatory scroll-smooth`}
        onWheel={onWheelAnimation}
      >
        <div className="min-w-full flex justify-center items-center h-full snap-center">
          가계부 시작하려 하나요?
        </div>
        <div className="min-w-full flex justify-center items-center h-full snap-center">
          그런데 엑셀을 할 줄 모른다구요?
        </div>
        <div className="min-w-full flex flex-col justify-center items-center h-full snap-center gap-10">
          <p>이젠 웹으로 간편하게 가계부 써봐요! </p>
          <button
            onClick={() => {
              setIsScrollOver(true);
              window.scrollTo({
                behavior: "smooth",
                top: secWrapRef.current?.clientHeight,
              });
            }}
            className="w-32 border-2 border-slate-600 rounded-md bg-white text-slate-600 text-xl p-2"
          >
            시작하기
          </button>
        </div>
      </div>
      <div
        ref={secWrapRef}
        style={{ minHeight: "100vh" }}
        className="w-full flex justify-center items-center gap-12"
      >
        {boxArr.map((el, index) => {
          return (
            <MainNaviBox
              key={el.path + index}
              el={el}
              index={index}
              onClickRoute={onClickRoute}
            ></MainNaviBox>
          );
        })}
      </div>
    </div>
  );
}
