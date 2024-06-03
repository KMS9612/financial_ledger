import { atom } from "recoil";

export const barChartUnitState = atom<"won" | "percent">({
  key: "barChartUnitState",
  default: "won",
});
