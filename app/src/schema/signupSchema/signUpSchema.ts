import * as yup from "yup";
export const signUpSchema = yup.object({
  email: yup
    .string()
    .email("이메일 형식에 맞춰주세요.")
    .required("이메일을 입력 해 주세요."),
  password: yup.string().required("비밀번호를 입력 해 주세요"),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 한번 더 입력 해 주세요"),
});
