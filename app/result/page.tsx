"use client";
import { useState } from "react";
import ResultChartContainer from "../src/components/pages/result/resultChartContainer";
import ResultBoxContainer from "../src/components/pages/result/resultBoxContainer";
import useFinancailData from "../src/lib/hooks/useFinancailData";
import NoDataPage from "../src/components/pages/NoDataPage/NoDataPage";
import CircleLoading from "../src/components/loading/circleLoading";
import { FixedDataTypeGuard } from "../src/types/fixedTypes/fixedDataType";

export default function ResultPage() {
  const { editData, fixedData } = useFinancailData();

  // useFinancialData로 불러온 데이터가 null 즉, 값 자체가 없을땐 NoDataPage를 렌더링
  if (fixedData === null || editData === undefined) {
    return <NoDataPage />;
  } else if (
    editData?.length === 0 ||
    !FixedDataTypeGuard(fixedData) || // FixedData가 IFixedData타입을 충족하는지 확인하는 타입가드 {}일 경우를 배제 시켜 에러를 방지
    Object.keys(fixedData).length === 0
  ) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <CircleLoading />
      </div>
    );
  } else if (
    fixedData !== null &&
    editData.length !== 0 &&
    Object.keys(fixedData).length !== 0
  ) {
    return (
      <div className="absolute w-full h-full flex flex-col gap-2 pt-20 px-4">
        <h2 className="text-slate-700 font-bold text-4xl">
          내 가계부 확인하기
        </h2>
        <div className="w-full h-full flex flex-col xl:flex-row gap-4 pb-2">
          <ResultChartContainer editData={editData} fixedData={fixedData} />
          <ResultBoxContainer fixedData={fixedData} editData={editData} />
        </div>
      </div>
    );
  }
}
