import api from "./instance";
import Cookie from "js-cookie";
interface FormData {
  date: string;
  type: string;
  amount: number;
  place: string;
}

export const postEditData = async (formData: FormData) => {
  try {
    const email = sessionStorage.getItem("email") || Cookie.get("email");

    if (email === null) {
      alert("로그인이 필요합니다. 로그아웃 후 다시 로그인 해주세요.");
      return;
    }
    await api.post("/edit/createEdit", {
      email: email,
      date: formData.date.replaceAll("-", "/"),
      financial_type: formData.type,
      amount: formData.amount,
      place: formData.place,
    });
  } catch {
    (err: any) => {
      throw err;
    };
  }
};
