import { ReactNode } from "react";

export interface IPropsGradientBtn {
  btnInnerText: string | ReactNode;
  onClickEvent?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}
