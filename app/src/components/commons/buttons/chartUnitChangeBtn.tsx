import { barChartUnitState } from "@/app/src/recoil/store/barChartUnit";
import { useRecoilState } from "recoil";

export default function ChartUnitChangeBtn() {
  const [chartUnit, setChartUnit] = useRecoilState(barChartUnitState);

  const onClickChangeUnit = () => {
    setChartUnit((prev) => (prev === "won" ? "percent" : "won"));
  };

  return (
    <button
      onClick={onClickChangeUnit}
      className="sm:w-fit w-full bg-slate-600 h-[35px] rounded text-white sm:text-base text-sm font-bold p-1"
    >
      {chartUnit === "won" ? "퍼센트(%)로 변경" : "원으로 변경"}
    </button>
  );
}
