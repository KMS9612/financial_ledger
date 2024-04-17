import { Dispatch, SetStateAction } from "react";

interface IPropsCategoryBtn {
  setShowMonthData: Dispatch<SetStateAction<boolean>>;
  showMonthData: boolean;
}

export default function ChartCategoryBtn({
  setShowMonthData,
  showMonthData,
}: IPropsCategoryBtn) {
  return (
    <button
      onClick={() => setShowMonthData((prev) => !prev)}
      className="absolute bg-slate-600 rounded right-2 top-2 text-white sm:text-base text-sm font-bold p-2"
    >
      {showMonthData ? "이번 년도" : "이번 달"}
    </button>
  );
}
