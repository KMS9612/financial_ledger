import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface IPropsModalInput<RT extends RegisterType> {
  el: CommonModalElements;
  register: UseFormRegister<RT>;
  errors?: FieldErrors<RT>;
}

interface CommonModalElements {
  label: string;
  inputAdd: string;
  labelName: string;
  type: string;
  defaultVal?: string | number | undefined;
  errMsg: string | undefined;
}

export type RegisterType = FixRegisterType | TodayRegisterType;

interface FixRegisterType {
  income: number;
  saving: number;
  fixed: number;
}

// ModalSelectInput에서도 사용
export interface TodayRegisterType {
  date: string;
  type: string;
  place: string;
  amount: number;
}
