import { Dispatch, SetStateAction } from "react";
import { IPropsIsOpenModal } from "./ModalProps";

export interface FormData {
  date: string;
  type: string;
  amount: number;
  place: string;
  [key: string]: string | number;
}

export interface IPropsTodayModal {
  isOpenFunction: (
    modalType: keyof IPropsIsOpenModal,
    changeType: boolean
  ) => void;
  isOpenObject: IPropsIsOpenModal;
  setFormData: Dispatch<
    SetStateAction<{
      date: string;
      type: string;
      amount: number;
      place: string;
    }>
  >;
  formData: FormData;
  fetchTableData: () => void;
}
