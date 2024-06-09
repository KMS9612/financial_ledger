import { useRecoilValue } from "recoil";
import { showMonthDataState } from "../../recoil/store/showMonthData";
import DoughnutChart from "./doughnut";
import BarChart from "./bar";

export default function ChartBox() {
  const showMonthData = useRecoilValue(showMonthDataState);

  return (
    <div className="w-full h-[500px] flex justify-center items-center border rounded-lg shadow-md p-2 overflow-auto">
      {showMonthData ? <DoughnutChart /> : <BarChart />}
    </div>
  );
}
