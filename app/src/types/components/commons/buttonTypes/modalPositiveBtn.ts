import React from "react";

export interface IPropsModalPositiveBtn {
  disable: boolean | undefined;
  btnText: string | React.JSX.Element;
  onClickEvent: () => void;
}
