import { useRecoilValue } from "recoil";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";
import { chartTargetYearState } from "../../recoil/store/chartYear";

export default function CalculateForChart(
  editData: any,
  fixedData: IFixedData
) {
  // 이번년도의 월별 지출과 수입을 배열로 백분율로 변환해 반환할것.
  let plus: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let minus: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let income = fixedData.income;

  // select로 선택된 연도를 가져오기 (yyyy Format), 초기값 "" 이라면 현재년도 가져오기
  const targetYear = useRecoilValue(chartTargetYearState);

  // 이번년도 데이터들만 자르기
  const filterData = editData.filter((el: any) => {
    return el.month.split("/")[0] === targetYear;
  });

  // 월 순서대로 수입과 지출 각각의 배열에 백분률 해서 저장하기
  filterData.forEach((el1: any) => {
    let month = parseInt(el1.month.split("/")[1]);
    el1.date.forEach((el2: any) => {
      if (el2.value.financial_type === "지출") {
        minus[month - 1] += (el2.value.amount / income) * 100;
      } else {
        plus[month - 1] += (el2.value.amount / income) * 100;
      }
    });
  });

  // 문제 발생: 배열에서 만약 없는 달이 있다면 0 으로 처리하고 넘어가야함. 즉 12번을 처리해야하며 해당 달에 대한 index에 push해야함.

  // plus, minus배열 백분율

  return { plus, minus };
}
