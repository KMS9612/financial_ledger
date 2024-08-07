"use client";
import ResultChartContainer from "../src/components/pages/result/resultChartContainer";
import ResultBoxContainer from "../src/components/pages/result/resultBoxContainer";
import useFinancailData from "../src/lib/hooks/useFinancailData";
import CircleLoading from "../src/components/loading/circleLoading";
import { FixedDataTypeGuard } from "../src/types/fixedTypes/fixedDataType";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const { editData, fixedData } = useFinancailData();
  const router = useRouter();

  // useFinancialData로 불러온 데이터가 null 즉, 값 자체가 없을땐 NoDataPage를 렌더링
  if (fixedData === null || editData === undefined) {
    router.push("/noDataPage");
    return;
  }

  // FixedData가 IFixedData타입을 충족하는지 확인하는 타입가드 {}일 경우를 배제 시켜 에러를 방지
  if (
    editData?.length === 0 ||
    !FixedDataTypeGuard(fixedData) ||
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
      <div className="w-full h-full flex flex-col justify-center items-center gap-2 animate-fade animate-onced">
        <ResultBoxContainer fixedData={fixedData} editData={editData} />
        <ResultChartContainer />
      </div>
    );
  }
}
