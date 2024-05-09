import { IPropsFetchedData } from "../../types/editTypes/editTypes";

export const sortEditData = (editData: any) => {
  let sortedData = [...editData];
  sortedData.sort((a: IPropsFetchedData, b: IPropsFetchedData) => {
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
