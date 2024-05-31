import api from "./instance";
import Cookie from "js-cookie";

export const getFixedData = async () => {
  try {
    const email = Cookie.get("email") || sessionStorage.getItem("email");
    const params = { email };
    if (!email) {
      alert("로그인이 필요합니다 로그아웃 후 다시 로그인 해주세요");
      return;
    }
    const res = await api.get("/fix/fetchFixedData", { params });
    return res.data.fixedData;
  } catch {
    (err: any) => {
      console.log(err);
      throw err;
    };
  }
};
