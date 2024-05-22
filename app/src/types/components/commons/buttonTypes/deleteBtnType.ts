export interface IPropsDeleteBtn {
  btnText: string;
  type: "button" | "submit" | "reset" | undefined;
  onClickEvent: () => void;
  isLoading: boolean;
}
