import api from "./instance";

export const getFixedData = async (params: { email: string | null }) => {
  try {
    const res = await api.get("/fix/fetchFixedData", { params });
    return res.data.fixedData;
  } catch {
    (err: any) => {
      console.log(err);
      throw err;
    };
  }
};
