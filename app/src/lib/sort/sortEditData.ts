import { IEditDataFull } from "../../types/editTypes/editTypes";

export const sortEditData = (editData: Array<IEditDataFull>) => {
  let sortedData = [...editData];
  sortedData.sort((a: IEditDataFull, b: IEditDataFull) => {
    const monthA = a.month;
    const monthB = b.month;
    if (monthA < monthB) {
      return 1;
    }
    if (monthA > monthB) {
      return -1;
    }
    return 0;
  });
  return sortedData;
};
