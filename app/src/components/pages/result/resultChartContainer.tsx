import ChartBox from "../../chart/resultChart";
import ChartCategoryBtn from "../../commons/buttons/chartCategoryBtn";
import ChartYearSelect from "../../commons/selects/chartYearSelect";

export default function ResultChartContainer() {
  return (
    <div className="w-full xl:w-3/4 flex flex-col gap-2">
      <div className="w-full h-12 border rounded-lg flex gap-2 justify-end items-center shadow-lg px-2 py-1">
        <ChartCategoryBtn />
        <ChartYearSelect />
      </div>
      <ChartBox />
    </div>
  );
}
