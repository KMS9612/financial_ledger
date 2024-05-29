import { IPropsChartContainer } from "@/app/src/types/resultlTypes/resultChartContainer";
import ChartBox from "../../chart/resultChart";
import ChartCategoryBtn from "../../commons/buttons/chartCategoryBtn";

export default function ResultChartContainer(props: IPropsChartContainer) {
  return (
    <div className="relative w-full xl:w-3/4 xl:h-[700px] h-[500px]">
      <ChartCategoryBtn />
      <ChartBox editData={props.editData} fixedData={props.fixedData} />
    </div>
  );
}
