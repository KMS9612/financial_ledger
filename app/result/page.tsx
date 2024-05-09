"use client";
import { useState } from "react";
import useCheckLogin from "../src/lib/checking/checkLogin";
import ResultChartContainer from "../src/components/pages/result/resultChartContainer";
import ResultBoxContainer from "../src/components/pages/result/resultBoxContainer";
import useFinancailData from "../src/lib/hooks/useFinancailData";
import NoDataPage from "../src/components/pages/NoDataPage/NoDataPage";
import CircleLoading from "../src/components/loading/circleLoading";

export default function ResultPage() {
  useCheckLogin();
  // MonthData를 보여주는 그래프의 활성화유무를 나타내는 State
  const [showMonthData, setShowMonthData] = useState(false);
  const { editData, fixedData } = useFinancailData();

  if (fixedData === null) {
    return <NoDataPage />;
  } else if (Object.keys(fixedData).length === 0) {
    return <CircleLoading />;
  } else {
    return (
      <div className="absolute w-full h-full flex flex-col gap-2 pt-20 px-4">
        <h2 className="text-slate-700 font-bold text-4xl">
          내 가계부 확인하기
        </h2>
        <div className="w-full h-full flex flex-col xl:flex-row gap-4 pb-2">
          <ResultChartContainer
            setShowMonthData={setShowMonthData}
            showMonthData={showMonthData}
            editData={editData}
            fixedData={fixedData}
          />
          <ResultBoxContainer fixedData={fixedData} editData={editData} />
        </div>
      </div>
    );
  }
}
