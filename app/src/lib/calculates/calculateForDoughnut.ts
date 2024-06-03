import { useRecoilValue } from "recoil";
import { IEditDataDate, IEditDataFull } from "../../types/editTypes/editTypes";
import { chartTargetMonthState } from "../../recoil/store/chartMonth";

export default function CalculateForDoughnut(editData: Array<IEditDataFull>) {
  let monthPlusData = 0;
  let monthMinusData = 0;

  // 선택된 연월 데이터 가져오기
  const targetMonth = useRecoilValue(chartTargetMonthState);

  const currentEditData = editData.filter(
    (el: IEditDataFull) => el.month === targetMonth
  );

  currentEditData[0]?.date.forEach((el: IEditDataDate) => {
    if (el.value.financial_type === "지출") {
      monthMinusData += el.value.amount;
    } else {
      monthPlusData += el.value.amount;
    }
  });

  return { monthMinusData, monthPlusData };
}
