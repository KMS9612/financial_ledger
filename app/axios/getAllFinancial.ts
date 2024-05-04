import { Dispatch, SetStateAction } from "react";
import api from "./instance";

export const getAllFinancial = async (
  params: { email: string | null },
  setEditData: Dispatch<SetStateAction<any>>
) => {
  await api
    .get("/edit/fetchAllFinancial", { params })
    .then((res) => {
      setEditData(res.data.data.data);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
