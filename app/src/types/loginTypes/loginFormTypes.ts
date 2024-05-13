import { RefObject } from "react";

export interface IPropsLoginForm {
  inputData: Array<InputData>;
}

export interface InputData {
  type: string;
  id: string;
  ref: RefObject<HTMLInputElement>;
  labelName: string;
}

export interface IPropsLoginFormInput {
  el: InputData;
}
