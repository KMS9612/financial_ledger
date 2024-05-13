import { IParamsFixedData } from "../types/fixedTypes/fixedDataType";
import api from "./instance";
import Cookie from "js-cookie";
export async function PostFixedData(fixedData: IParamsFixedData) {
  const email = sessionStorage.getItem("email") || Cookie.get("email");
  const params = {
    email,
    income: fixedData.income,
    saving: fixedData.saving,
    fixed: fixedData.fixed,
  };
  await api
    .post("/fix/createFixedData", params)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}
