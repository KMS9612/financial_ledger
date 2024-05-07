import api from "./instance";

export const getAllFinancial = async (params: { email: string | null }) => {
  try {
    const res = await api.get("/edit/fetchAllFinancial", { params });
    return res.data.data.data;
  } catch {
    (err: any) => {
      console.log(err);
      throw err;
    };
  }
};
