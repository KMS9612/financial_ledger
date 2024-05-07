import api from "./instance";

export const getFixedData = async (params: { email: string | null }) => {
  try {
    const res = await api.get("/fix/fetchFixedData", { params });
    if (res.data.fixedData === null) {
      return {
        id: "",
        email: "",
        saving: NaN,
        fixed: NaN,
        income: NaN,
      };
    } else {
      return res.data.fixedData;
    }
  } catch {
    (err: any) => {
      console.log(err);
      throw err;
    };
  }
};
