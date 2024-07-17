import axios from "axios";

export const postCreateNewUser = async (body: {
  email: string;
  password: string;
}) => {
  try {
    if (!body.email || !body.password) {
      alert("입력 값이 불충분합니다, 입력값을 다시 입력 후 재시도 해주세요.");
      return;
    }
    const res = await axios.post(
      "https://ggb-back-87f71d708f48.herokuapp.com/createUser",
      // "http://ec2-54-180-146-189.ap-northeast-2.compute.amazonaws.com/createUser",
      body
    );
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
