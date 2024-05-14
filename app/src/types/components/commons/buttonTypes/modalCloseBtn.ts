export interface IPropsModalCloseBtn {
  btnText: string;
  onClickEvent: () => void;
  type?: "button" | "reset" | "submit" | undefined;
}
