import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IPropsLoginForm {
  inputData: Array<InputData>;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
}

export interface IPropsLoginFormInput {
  el: InputData;
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
}

export interface LoginFormData {
  id: string;
  pw: string;
}

export interface InputData {
  type: string;
  id: string;
  labelName: string;
}
