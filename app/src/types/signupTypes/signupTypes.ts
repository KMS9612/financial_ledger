import { FieldError, FieldErrors, UseFormRegister } from "react-hook-form";

export interface IFormSignupInner {
  text: string;
  isErr: boolean;
  errMessage: string;
}

export interface IFormSignup {
  email: IFormSignupInner;
  pw: IFormSignupInner;
  pw_check: IFormSignupInner;
  [key: string]: IFormSignupInner;
}

export interface IPropsSignupForm {
  register: UseFormRegister<SignUpFormRegister>;
  signUpFormInputData: Array<SignUpFormInputElements>;
  isLoading: boolean;
}

export interface IPropsSignUpFormInput {
  register: UseFormRegister<SignUpFormRegister>;
  el: SignUpFormInputElements;
}

export interface SignUpFormInputElements {
  placeholder: string;
  type: string;
  id: "email" | "password" | "passwordCheck";
  errMsg: string | undefined;
}

export interface SignUpFormRegister {
  email: string;
  password: string;
  passwordCheck: string;
}
