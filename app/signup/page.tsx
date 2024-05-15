"use client";
import { useState } from "react";
import SignUpAlertModal from "../src/components/modals/signUpModal";
import SignUpForm from "../src/components/commons/forms/signupForm";
import SignUpRightDeco from "../src/components/pages/signup/signUpRightDeco";
import { postCreateNewUser } from "../src/service/postCreateNewUser";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../src/schema/signupSchema/signUpSchema";
import {
  SignUpFormInputElements,
  SignUpFormRegister,
} from "../src/types/signupTypes/signupTypes";

export default function SignUp() {
  const [modalText, setModalText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const signUpFormInputData: Array<SignUpFormInputElements> = [
    {
      placeholder: "Email",
      type: "email",
      id: "email",
      errMsg: errors.email?.message,
    },
    {
      placeholder: "Password",
      type: "password",
      id: "password",
      errMsg: errors.password?.message,
    },
    {
      placeholder: "Password Check",
      type: "password",
      id: "passwordCheck",
      errMsg: errors.passwordCheck?.message,
    },
  ];

  const signUp = async (data: SignUpFormRegister) => {
    setIsLoading(true);
    try {
      // 회원가입 Post요청 보내기
      const email = data.email;
      const password = data.password;
      const response = await postCreateNewUser({ email, password });

      sessionStorage.setItem("email", email);
      // Modal 표시하기
      setIsOpen(true);
      setModalText(response.message);
    } catch (err: any) {
      setIsOpen(true);
      setModalText(
        err.response
          ? err.response.data.message
          : "알 수 없는 문제가 발생했습니다. 다시 시도해 주세요"
      );
    }
    setIsLoading(false);
  };

  const onSubmit = handleSubmit((data) => {
    signUp(data);
  });

  return (
    <div className="relative w-full h-full bg-gray-200 flex justify-center items-center">
      <SignUpAlertModal
        text={modalText}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <form
        onSubmit={onSubmit}
        className="w-5/6 h-5/6 flex rounded-xl shadow-xl"
      >
        <SignUpForm
          isLoading={isLoading}
          register={register}
          signUpFormInputData={signUpFormInputData}
        />
        <SignUpRightDeco />
      </form>
    </div>
  );
}
