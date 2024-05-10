import { IPropsIsOpenModal } from "./ModalProps";
import { Dispatch, SetStateAction } from "react";

export interface FormData {
  date: string;
  type: string;
  amount: number;
  place: string;
  [key: string]: string | number;
}

export interface IPropsTodayModal {
  isOpenObject: IPropsIsOpenModal;
  setIsOpenObject: Dispatch<SetStateAction<IPropsIsOpenModal>>;
}
