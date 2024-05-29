import { showMonthDataState } from "@/app/src/recoil/store/showMonthData";
import { useRecoilState } from "recoil";

export default function ChartCategoryBtn() {
  const [showMonthData, setShowMonthData] = useRecoilState(showMonthDataState);
  return (
    <button
      onClick={() => setShowMonthData((prev) => !prev)}
      className="absolute bg-slate-600 rounded right-2 top-2 text-white sm:text-base text-sm font-bold p-2"
    >
      {showMonthData ? "이번 년도" : "이번 달"}
    </button>
  );
}
