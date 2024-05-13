import { MouseEvent } from "react";

export interface IPropsLoginBtnWrap {
  onClickTestAccountLogin: (event: MouseEvent<HTMLButtonElement>) => void;
  loginLoading: boolean;
  onClickLogin: (test: boolean) => void;
}
