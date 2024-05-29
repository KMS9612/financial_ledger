import { showMonthDataState } from "@/app/src/recoil/store/showMonthData";
import { useRecoilState } from "recoil";

export default function ChartCategoryBtn() {
  const [showMonthData, setShowMonthData] = useRecoilState(showMonthDataState);
  return (
    <button
      onClick={() => setShowMonthData((prev) => !prev)}
      className="bg-slate-600 rounded text-white sm:text-base text-sm font-bold p-1"
    >
      {showMonthData ? "이번 년도" : "이번 달"} 차트 보기
    </button>
  );
}
