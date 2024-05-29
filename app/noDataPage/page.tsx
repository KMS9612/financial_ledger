"use client";
import { useEffect, useState } from "react";
import { useChangeStateOfModals } from "../src/lib/hooks/useChangeStateOfModals";
import useFinancailData from "../src/lib/hooks/useFinancailData";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import GradientBtn from "../src/components/commons/buttons/gradientBtn";
import CircleCheckAnimation from "../src/components/commons/animation/circleCheckAni";
import { useRouter } from "next/navigation";
import CircleLoading from "../src/components/loading/circleLoading";

export default function NoDataPage() {
  const router = useRouter();
  const { changeModalState } = useChangeStateOfModals();
  const [isLoading, setIsLoading] = useState(true);
  const [haveData, setHaveData] = useState({
    edit: false,
    fixed: false,
  });
  const { editData, fixedData } = useFinancailData();

  useEffect(() => {
    if (fixedData !== null && Object.keys(fixedData).length !== 0) {
      setIsLoading(true);
      setHaveData((prev) => ({ ...prev, fixed: true }));
    }
    if (editData?.length !== 0 && editData !== undefined) {
      setIsLoading(true);
      setHaveData((prev) => ({ ...prev, edit: true }));
    }

    setTimeout(() => {
      if (haveData.fixed && haveData.edit) {
        router.push("/result");
      }
    }, 1500);
    setIsLoading(false);
  }, [fixedData, editData, haveData.fixed, haveData.edit, router]);

  return (
    <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <TodayPayModal />
      <FixPayModal />
      <div className="w-[300px] h-[400px] flex flex-col justify-between p-4 rounded-xl shadow-2xl shadow-gray-300 bg-white">
        <div className="w-full">
          <h2 className="font-bold text-xl">알림</h2>
        </div>
        <div className="flex justify-center items-center">
          <p className=" font-semibold">
            고정 비용 데이터와 일일 지출 / 수입 내용을 등록 한 후 이용 할 수
            있습니다.
          </p>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <CircleLoading />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-2">
            <GradientBtn
              btnInnerText={
                haveData.fixed ? <CircleCheckAnimation /> : "고정 비용 등록"
              }
              isDisabled={haveData.fixed}
              onClickEvent={() => {
                changeModalState("edit", true);
              }}
            ></GradientBtn>
            <GradientBtn
              btnInnerText={
                haveData.edit ? (
                  <CircleCheckAnimation />
                ) : (
                  "일일 지출 / 수입 등록"
                )
              }
              isDisabled={haveData.edit}
              onClickEvent={() => {
                changeModalState("today", true);
              }}
            ></GradientBtn>
          </div>
        )}
      </div>
    </div>
  );
}
