import { ITableData } from "../../types/editTypes/tableType";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";

/** editData, fixedData를 받아 객체 {이번 달 지출: number, 이번 달 수입: number }를 반환하는 함수 */
export default function CalculateData(editData: any, fixedData: IFixedData) {
  // 현재 년 월을 가져오기 (yyyy/mm Format)
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const date = year + "/" + month;

  // editData에서 현재 년월에 맞는 데이터 잘라서 저장하기
  const filterData = editData.filter((el: any) => el.month === date);

  // 자른 데이터에서 지출과 수입을 모두 합산해서 배열로 저장
  let plus: number = 0;
  let minus: number = 0;

  filterData[0]?.date.forEach((el: ITableData) => {
    let type = el.value.financial_type;
    if (type === "지출") {
      minus += el.value.amount;
    } else {
      plus += el.value.amount;
    }
  });

  // 고정 지출 + minus합산 = 이번달 지출
  const monthMinus = fixedData?.fixed + minus + fixedData?.saving;

  // 고정 수입 + plus합산 = 이번달 수입
  const monthPlus = fixedData?.income + plus;

  // 이번달 수입 - 이번달 지출 - 저금 = 사용가능 금액
  const leftMoney = monthPlus - monthMinus;

  return { monthMinus, monthPlus, leftMoney };
}
