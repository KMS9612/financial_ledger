"use client";
import { useEffect, useState } from "react";
import ResultBoxSmall from "../src/components/commons/boxes/resultBoxSm";
import { useRouter } from "next/navigation";
import { IFixedData } from "../src/types/fixedTypes/fixedDataType";
import CalculateData from "../src/lib/calculates/calculateData";
import ChartBox from "../src/components/chart/resultChart";
import useCheckLogin from "../src/lib/checking/checkLogin";
import ChartCategoryBtn from "../src/components/chart/chartCategoryBtn";
import { getFixedData } from "../src/service/getFixedData";
import { getAllFinancial } from "../src/service/getAllFinancial";

export default function ResultPage() {
  useCheckLogin();
  const router = useRouter();
  const [showMonthData, setShowMonthData] = useState(false);
  const [editData, setEditData] = useState<any>([]);
  const [fixedData, setFixedData] = useState<IFixedData>({
    id: "",
    email: "",
    saving: NaN,
    fixed: NaN,
    income: NaN,
  });

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const params = { email };
    // 고정비용 요청하기
    getFixedData(params, setFixedData);

    // 일일 등록 정보 요청하기
    getAllFinancial(params, setEditData);
  }, []);

  // 요청한 일일 등록 정보 합산
  const { monthPlus, monthMinus, leftMoney } = CalculateData(
    editData,
    fixedData
  );

  const dataSet = [
    {
      title: "고정비용",
      subText: "사용자가 설정한 고정지출금, 고정수익금, 저금에 대한 액수",
      data: fixedData,
    },
    {
      title: "이번 달 총 수입",
      subText: "이번 달 고정수입과 일일수입을 모두 합친 액수",
      data: monthPlus,
    },
    {
      title: "이번 달 총 지출",
      subText: "이번 달의 고정지출과 일일지출을 모두 합친 액수",
      data: monthMinus,
    },
    {
      title: "사용 가능 금액",
      subText: "고정비용, 일일지출을 모두 합산해서 현재 사용가능 한 액수",
      data: leftMoney,
    },
  ];

  return (
    <div className="absolute w-full h-full flex flex-col gap-2 pt-20 px-4">
      <h2 className="text-slate-700 font-bold text-4xl">내 가계부 확인하기</h2>
      <div className="w-full h-full flex flex-col xl:flex-row gap-4 pb-2">
        <div className="relative w-full xl:w-3/4 xl:h-[700px] h-[500px]">
          <ChartCategoryBtn
            setShowMonthData={setShowMonthData}
            showMonthData={showMonthData}
          ></ChartCategoryBtn>
          <ChartBox
            editData={editData}
            fixedData={fixedData}
            showMonthData={showMonthData}
          />
        </div>
        <div className="w-full xl:w-1/4 flex flex-row flex-wrap xl:flex-col gap-4">
          {/* 데이터 표시 박스 */}
          {dataSet.map((el, index) => (
            <ResultBoxSmall
              key={el.title + index}
              title={el.title}
              subText={el.subText}
              data={el.data}
            />
          ))}
          <button
            onClick={() => router.push("/edit")}
            className="w-full xl:w-full h-24 border shadow-md bg-slate-600 text-white font-bold text-xl rounded"
          >
            일일 지출/수입 작성하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
