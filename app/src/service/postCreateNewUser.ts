import axios from "axios";

export const postCreateNewUser = async (body: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      "https://ggb-back-0b82d9178398.herokuapp.com/createUser",
      body
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
