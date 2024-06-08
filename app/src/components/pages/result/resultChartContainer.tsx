import { useRecoilValue } from "recoil";
import ChartBox from "../../chart/resultChart";
import ChartCategoryBtn from "../../commons/buttons/chartCategoryBtn";
import ChartUnitChangeBtn from "../../commons/buttons/chartUnitChangeBtn";
import ChartYearSelect from "../../commons/selects/chartYearSelect";
import { showMonthDataState } from "@/app/src/recoil/store/showMonthData";
import ResultBtnDropDown from "./resultBtnDropDown";

export default function ResultChartContainer() {
  const showMonthData = useRecoilValue(showMonthDataState);

  // true는 항상 렌더링
  const chartComp = [
    {
      comp: ChartUnitChangeBtn,
      isShow: (showMonthData: boolean) => !showMonthData,
      key: "ChartUnitChangeBtn",
    },
    { comp: ChartCategoryBtn, isShow: () => true, key: "ChartCategoryBtn" },
    { comp: ChartYearSelect, isShow: () => true, key: "ChartYearSelect" },
  ];

  return (
    <div className="w-full xl:w-3/4 flex flex-col gap-2">
      <div className="sm:hidden w-full h-12 border rounded-lg flex gap-2 justify-end items-center shadow-lg px-2 py-1">
        <ResultBtnDropDown
          optionLabel="차트 옵션"
          options={chartComp}
        ></ResultBtnDropDown>
      </div>
      <div className="sm:flex hidden w-full h-12 border rounded-lg gap-2 justify-end items-center shadow-lg px-2 py-1">
        {chartComp
          .filter((comp) => comp.isShow(showMonthData))
          .map((el) => {
            const Components = el.comp;
            return <Components key={el.key} />;
          })}
      </div>
      <ChartBox />
    </div>
  );
}
