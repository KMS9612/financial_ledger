import api from "./instance";

export function PostFixedData(email: string) {
  const params = {
    email,
    income: 0,
    saving: 0,
    fixed: 0,
  };
  api
    .post("/fix/createFixedData", params)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
