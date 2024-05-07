import { Dispatch, SetStateAction } from "react";
import { IFormSignup } from "../../types/signupTypes/signupTypes";

// 회원가입 버튼을 누른후 작동하는 FormData의 형식을 확인하는 함수
export const checkFormData = (
  formData: IFormSignup,
  setFormData: Dispatch<SetStateAction<IFormSignup>>
) => {
  const newObj = { ...formData };
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isPass = true;

  // email형식에 맞는지 확인하는 부분
  if (!emailReg.test(newObj.email.text)) {
    setFormData((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        isErr: true,
        errMessage: "이메일 형식에 맞지 않습니다.",
      },
    }));
    isPass = false;
  }

  // 이메일을 입력했는지 확인하는 부분
  if (!newObj.email.text) {
    setFormData((prev) => ({
      ...prev,
      email: {
        ...prev.email,
        isErr: true,
        errMessage: "이메일을 입력해주세요",
      },
    }));
    isPass = false;
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 확인하는 코드, pw와 pw_check가 입력됬는지 확인하는 코드
  if (newObj.pw.text !== newObj.pw_check.text) {
    setFormData((prev) => ({
      ...prev,
      pw: {
        ...prev.pw,
        isErr: true,
        errMessage: "비밀번호가 일치하지 않습니다.",
      },
      pw_check: {
        ...prev.pw_check,
        isErr: true,
        errMessage: "비밀번호가 일치하지 않습니다.",
      },
    }));
    isPass = false;
  }

  // 비밀번호가 입력됬는지 확인하는 부분
  if (!newObj.pw.text) {
    setFormData((prev) => ({
      ...prev,
      pw: {
        ...prev.pw,
        isErr: true,
        errMessage: "비밀번호를 입력해 주세요.",
      },
    }));
    isPass = false;
  }

  // 비밀번호확인이 입력됬는지 확인하는 부분
  if (!newObj.pw_check.text) {
    setFormData((prev) => ({
      ...prev,
      pw_check: {
        ...prev.pw_check,
        isErr: true,
        errMessage: "비밀번호를 확인해 주세요.",
      },
    }));
    isPass = false;
  }

  // 모두 통과했다면 true반환
  return isPass;
};
