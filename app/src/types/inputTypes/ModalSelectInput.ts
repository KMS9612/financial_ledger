import { UseFormRegister } from "react-hook-form";
import { TodayRegisterType } from "./ModalInput";

export interface IPropsModalSelect<RT extends TodayRegisterType> {
  el: {
    label: string;
    inputAdd: string;
    labelName: string;
    type: string;
    errMsg: string | undefined;
  };

  register: UseFormRegister<RT>;
}
