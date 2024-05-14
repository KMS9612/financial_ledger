import { FieldErrors, UseFormRegister } from "react-hook-form";
import { IParamsFixedData } from "../fixedTypes/fixedDataType";

export interface IPropsModalInput {
  el: {
    label: string;
    inputAdd: string;
    labelName: string;
    type: string;
    defaultVal: number;
  };
  register: UseFormRegister<IParamsFixedData>;
  errors?: FieldErrors<IParamsFixedData>;
}
