import * as yup from "yup";

export const todayPayModalSchema = yup
  .object({
    type: yup
      .string()
      .typeError("숫자를 입력해 주세요")
      .required("고정지출을 입력 해 주세요"),
    date: yup
      .string()
      .typeError("숫자를 입력해 주세요")
      .required("저금액을 입력 해 주세요"),
    place: yup
      .string()
      .typeError("숫자를 입력해 주세요")
      .required("고정 수입을 입력 해 주세요"),
    amount: yup
      .number()
      .typeError("숫자를 입력해 주세요")
      .required("고정 수입을 입력 해 주세요"),
  })
  .required();
