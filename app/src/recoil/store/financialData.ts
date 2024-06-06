import { atom } from "recoil";
import { IEditDataFull } from "../../types/editTypes/editTypes";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";

export const editDataState = atom<Array<IEditDataFull>>({
  key: "editDataState",
  default: [],
});

export const fixedDataState = atom<IFixedData | {}>({
  key: "fixedDataState",
  default: {},
});
