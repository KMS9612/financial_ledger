import { atom } from "recoil";

export const editDataState = atom({ key: "editDataState", default: [] });

export const fixedDataState = atom({
  key: "fixedDataState",
  default: {},
});
