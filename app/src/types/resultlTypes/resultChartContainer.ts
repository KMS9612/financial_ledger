import { Dispatch, SetStateAction } from "react";
import { IFixedData } from "../fixedTypes/fixedDataType";

export interface IPropsChartContainer {
  setShowMonthData: Dispatch<SetStateAction<boolean>>;
  showMonthData: boolean;
  editData: any;
  fixedData: IFixedData;
}
