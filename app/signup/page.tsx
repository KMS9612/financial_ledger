"use client";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import SignUpAlertModal from "../src/components/modals/signUpModal";
import SignUpForm from "../src/components/signup/signupForm";
import { IFormSignup } from "../src/types/signupTypes/signupTypes";
import { checkFormData } from "../functions/checkFormData";
import { PostFixedData } from "../axios/postFixedData";

export default function SignUp() {
  const [formData, setFormData] = useState<IFormSignup>({
    email: { text: "", isErr: false, errMessage: "" },
    pw: { text: "", isErr: false, errMessage: "" },
    pw_check: { text: "", isErr: false, errMessage: "" },
  });
  const [modalText, setModalText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChangeSetFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newObj = { ...formData };
    newObj[target.id].text = target.value;
    setFormData(newObj);
  };

  const onClickSignUp = async () => {
    // 이메일형식,비밀번호 일치 확인
    const isPass = checkFormData(formData, setFormData);

    if (isPass) {
      // 회원가입 Post요청 보내기
      const email = formData.email.text;
      const password = formData.pw.text;
      await axios
        .post("https://ggb-back-0b82d9178398.herokuapp.com/createUser", {
          email,
          password,
        })
        .then((res) => {
          // FixedData 기본값 설정
          PostFixedData(email);
          // Modal 표시하기
          setIsOpen(true);
          setModalText(res.data.message);
        })
        .catch((err) => {
          // Modal 표시하기
          setIsOpen(true);
          setModalText(err.response.data.message);
        });
    }
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-500 to-slate-700 flex justify-center items-center">
      <SignUpAlertModal
        text={modalText}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <SignUpForm
        onChangeSetFormData={onChangeSetFormData}
        formData={formData}
        onClickSignUp={onClickSignUp}
      />
    </div>
  );
}
