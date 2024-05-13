import axios from "axios";

export const postLogin = async (params: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      "https://ggb-back-0b82d9178398.herokuapp.com/login",
      {
        email: params.email,
        password: params.password,
      }
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
