export interface IPropsGradientBtn {
  btnInnerText: string;
  onClickEvent?: () => void;
  isLoading?: boolean;
  type?: "button" | "reset" | "submit" | undefined;
}
