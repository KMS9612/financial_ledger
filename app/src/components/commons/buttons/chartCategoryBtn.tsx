import { showMonthDataState } from "@/app/src/recoil/store/showMonthData";
import { useRecoilState } from "recoil";

export default function ChartCategoryBtn() {
  const [showMonthData, setShowMonthData] = useRecoilState(showMonthDataState);
  return (
    <button
      onClick={() => setShowMonthData((prev) => !prev)}
      className="bg-slate-600 h-[35px] rounded text-white sm:text-base text-sm font-bold p-1"
    >
      {showMonthData ? "연 간" : "월 간"} 차트 보기
    </button>
  );
}
