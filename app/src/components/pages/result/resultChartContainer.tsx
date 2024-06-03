import { IPropsChartContainer } from "@/app/src/types/resultlTypes/resultChartContainer";
import ChartBox from "../../chart/resultChart";
import ChartCategoryBtn from "../../commons/buttons/chartCategoryBtn";

export default function ResultChartContainer(props: IPropsChartContainer) {
  return (
    <div className="w-full xl:w-3/4 flex flex-col gap-2">
      <div className="w-full h-12 border rounded-lg flex justify-end items-center shadow-lg px-2 py-1">
        <ChartCategoryBtn />
      </div>
      <ChartBox />
    </div>
  );
}
