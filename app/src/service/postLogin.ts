import axios from "axios";

export const postLogin = async (params: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      "https://ggb-back-deploy-856a8d52b46b.herokuapp.com/login",
      // "http://ec2-54-180-146-189.ap-northeast-2.compute.amazonaws.com/login",
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
