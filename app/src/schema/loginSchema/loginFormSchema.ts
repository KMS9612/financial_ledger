import * as yup from "yup";

export const loginFormSchema = yup
  .object({
    id: yup
      .string()
      .email("이메일 형식에 맞지 않습니다.")
      .required("ID(Email)을 입력 해 주세요."),
    pw: yup.string().required("PassWord를 입력 해 주세요."),
  })
  .required("아이디, 비밀번호를 입력 해 주세요");
