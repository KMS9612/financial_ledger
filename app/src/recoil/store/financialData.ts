import { atom } from "recoil";

export const editDataState = atom({ key: "editDataState", default: [] });

export const fixedDataState = atom({
  key: "fixedDataState",
  default: { id: "", email: "", saving: NaN, fixed: NaN, income: NaN },
});
