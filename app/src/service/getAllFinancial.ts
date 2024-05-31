import api from "./instance";
import Cookie from "js-cookie";
// get All Edit Data Request
export const getAllFinancial = async () => {
  try {
    const email = Cookie.get("email") || sessionStorage.getItem("email");
    // const email = sessionStorage.getItem("email");
    const params = { email };
    if (!email) {
      alert("로그인이 필요합니다 로그아웃 후 다시 로그인 해주세요");
      return;
    }
    const res = await api.get("/edit/fetchAllFinancial", { params });

    const editData = res.data.data.data;
    sessionStorage.setItem("monthData", JSON.stringify(editData));
    return editData;
  } catch {
    (err: any) => {
      console.log(err);
      throw err;
    };
  }
};
