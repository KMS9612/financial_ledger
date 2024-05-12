import api from "./instance";
import Cookie from "js-cookie";

export const getFixedData = async () => {
  try {
    const email = Cookie.get("email") || sessionStorage.getItem("email");
    const params = { email };
    const res = await api.get("/fix/fetchFixedData", { params });
    return res.data.fixedData;
  } catch {
    (err: any) => {
      console.log(err);
      throw err;
    };
  }
};
