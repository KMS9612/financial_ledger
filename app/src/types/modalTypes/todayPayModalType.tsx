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
}
