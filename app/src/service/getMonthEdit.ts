import api from "./instance";
import Cookie from "js-cookie";

export const getMonthEdit = async (yearMonth: string) => {
  try {
    const email = sessionStorage.getItem("email") || Cookie.get("email");
    const params = { email, yearMonth };
    if (!email) {
      alert("로그인이 필요합니다 로그아웃 후 다시 로그인 해주세요");
      return;
    }
    const response = await api.get("/edit/fetchMonthEdit", { params });

    return response.data.result[0].data[0].date;
  } catch (err) {
    console.log(err);
  }
};
