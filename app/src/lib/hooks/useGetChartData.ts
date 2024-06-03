import { useRecoilState, useRecoilValue } from "recoil";
import {
  chartTargetYearState,
  chartYearListState,
} from "../../recoil/store/chartYear";
import {
  chartMonthListState,
  chartTargetMonthState,
} from "../../recoil/store/chartMonth";
import { editDataState } from "../../recoil/store/financialData";
import { useCallback, useEffect } from "react";
import { IEditDataFull } from "../../types/editTypes/editTypes";
import { sortEditData } from "../sort/sortEditData";

const useGetChartData = () => {
  const editData: Array<IEditDataFull> = useRecoilValue(editDataState);
  const [yearList, setYearList] = useRecoilState(chartYearListState);
  const [targetYear, setTargetYear] = useRecoilState(chartTargetYearState);
  const [monthList, setMonthList] = useRecoilState(chartMonthListState);
  const [targetMonth, setTargetMonth] = useRecoilState(chartTargetMonthState);

  const sortedEditData = sortEditData(editData);

  const getYearList = () => {
    let yearArr: Array<string> = [];

    sortedEditData.forEach((el: IEditDataFull) => {
      const yearData = el.month.split("/")[0];
      if (!yearArr.includes(yearData)) {
        yearArr.push(yearData);
      }
    });

    setYearList(yearArr);
  };

  const getMonthList = () => {
    let monthArr: Array<string> = [];
    sortedEditData.forEach((el: IEditDataFull) => {
      const monthData = el.month;
      monthArr.push(monthData);
    });

    setMonthList(monthArr);
  };

  useEffect(() => {
    getYearList();
    getMonthList();
  }, []);

  return { yearList, monthList, setTargetYear, setTargetMonth };
};

export default useGetChartData;
