import useGetChartData from "@/app/src/lib/hooks/useGetChartData";
import { chartTargetMonthState } from "@/app/src/recoil/store/chartMonth";
import { chartTargetYearState } from "@/app/src/recoil/store/chartYear";
import { showMonthDataState } from "@/app/src/recoil/store/showMonthData";
import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";

export default function ChartYearSelect() {
  const showMonthData = useRecoilValue(showMonthDataState);
  const targetMonth = useRecoilValue(chartTargetMonthState);
  const targetYear = useRecoilValue(chartTargetYearState);

  const onChangeSetTargetYear = (event: ChangeEvent<HTMLSelectElement>) => {
    !showMonthData
      ? setTargetYear(event.target.value)
      : setTargetMonth(event.target.value);
  };

  const { yearList, setTargetYear, monthList, setTargetMonth } =
    useGetChartData();

  return (
    <select
      onChange={onChangeSetTargetYear}
      name=""
      id=""
      className="sm:w-[150px] w-full h-[35px] border border-slate-500 rounded-lg outline-none focus:outline-none"
      value={!showMonthData ? targetYear : targetMonth}
    >
      <option value="" disabled>
        Date
      </option>
      {(!showMonthData ? yearList : monthList).map((el: string) => (
        <option key={el} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
}
