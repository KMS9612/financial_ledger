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
  if (!email) {
    alert("로그인이 필요합니다 로그아웃 후 다시 로그인 해주세요");
  }
  if (!params.income || !params.saving || !params.fixed) {
    alert("입력값이 불충분합니다, 입력값을 다시 입력 후 재시도해주세요.");
    return;
  }
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
