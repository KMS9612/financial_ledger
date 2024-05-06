import { ChangeEvent } from "react";

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
  onChangeSetFormData: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: IFormSignup;
  onClickSignUp: () => void;
}
