import { atom } from "recoil";

const today = new Date();
const year = today.getFullYear();

export const chartYearListState = atom<Array<string>>({
  key: "chartYearListState",
  default: [],
});

export const chartTargetYearState = atom({
  key: "chartTargetYearState",
  default: year.toString(),
});
