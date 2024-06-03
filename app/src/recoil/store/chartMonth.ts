import { atom } from "recoil";

// 현재 년 월 데이터 가져오기
const today = new Date();
const currentMonth =
  today.getFullYear().toString() +
  "/" +
  ("0" + (today.getMonth() + 1)).slice(-2).toString();

export const chartMonthListState = atom<Array<string>>({
  key: "chartMonthListState",
  default: [],
});

export const chartTargetMonthState = atom({
  key: "chartTargetMonthState",
  default: currentMonth,
});
