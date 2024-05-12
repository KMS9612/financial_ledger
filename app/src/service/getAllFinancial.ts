import api from "./instance";
import Cookie from "js-cookie";
// get All Edit Data Request
export const getAllFinancial = async () => {
  try {
    const email = Cookie.get("email") || sessionStorage.getItem("email");
    // const email = sessionStorage.getItem("email");
    const params = { email };
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
