"use client";
import useCheckLogin from "../functions/checkLogin";
import ResultBoxLarge from "../src/components/box/resultBoxLg";
import ResultBoxSmall from "../src/components/box/resultBoxSm";
import { useRouter } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  useCheckLogin(router);

  const dataSet = [
    {
      title: "고정비용",
      subText: "사용자가 설정한 고정지출금, 고정수익금, 저금에 대한 액수",
      data: "",
    },
    {
      title: "이번 달 총 지출",
      subText: "이번 달의 고정지출과 일일지출을 모두 합친 액수",
      data: "",
    },
    {
      title: "이번 달 총 수입",
      subText: "이번 달 고정수입과 일일수입을 모두 합친 액수",
      data: "",
    },
  ];

  return (
    <div className="w-full h-full pt-20 p-10">
      <h2 className="font-bold text-4xl mb-10">확인하기</h2>
      <div className="flex gap-10 h-full pb-10">
        <div className="w-full h-full">
          <ResultBoxLarge
            title={"FinancialGraph"}
            subText="이번년도 지출,수익 현황을 한눈에 볼 수 있는 그래프"
          />
        </div>
        <div className="flex flex-col gap-10">
          {/* 데이터 표시 박스 */}
          {dataSet.map((el) => (
            <ResultBoxSmall title={el.title} subText={el.subText} />
          ))}
          <button className="w-full h-24 border shadow-md bg-slate-600 text-white font-bold text-xl rounded">
            일일 지출/수입 작성하러 가기
          </button>
        </div>
      </div>
    </div>
  );
}
