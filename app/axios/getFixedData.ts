import { Dispatch, SetStateAction } from "react";
import { IFixedData } from "../src/types/fixedTypes/fixedDataType";
import api from "./instance";

export const getFixedData = async (
  params: { email: string | null },
  setFixedData: Dispatch<SetStateAction<IFixedData>>
) => {
  await api
    .get("/fix/fetchFixedData", { params })
    .then((res) => {
      if (res.data.fixedData === null) {
        setFixedData({
          id: "",
          email: "",
          saving: NaN,
          fixed: NaN,
          income: NaN,
        });
      } else {
        setFixedData(res.data.fixedData);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
