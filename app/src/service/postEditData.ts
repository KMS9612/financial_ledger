import api from "./instance";

interface FormData {
  date: string;
  type: string;
  amount: number;
  place: string;
}

export const postEditData = async (formData: FormData) => {
  try {
    const email = sessionStorage.getItem("email");

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
