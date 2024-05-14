import { MouseEvent } from "react";
import { LoginFormData } from "./loginFormTypes";

export interface IPropsLoginBtnWrap {
  onClickTestAccountLogin: (event: MouseEvent<HTMLButtonElement>) => void;
  loginLoading: boolean;
  onClickLogin: (test: boolean, data: LoginFormData | null) => void;
  setValue: any;
}
