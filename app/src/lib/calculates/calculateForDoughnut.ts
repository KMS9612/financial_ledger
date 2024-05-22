import {
  IEditDataDate,
  IEditDataFull,
  IPropsFetchedData,
} from "../../types/editTypes/editTypes";

export default function CalculateForDoughnut(editData: Array<IEditDataFull>) {
  let monthPlusData = 0;
  let monthMinusData = 0;
  const today = new Date();
  const currentMonth =
    today.getFullYear().toString() +
    "/" +
    ("0" + (today.getMonth() + 1)).slice(-2).toString();

  const currentEditData = editData.filter(
    (el: any) => el.month === currentMonth
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
