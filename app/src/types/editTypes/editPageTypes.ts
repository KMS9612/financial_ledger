import { Dispatch, SetStateAction } from "react";
import { IPropsIsOpenModal } from "../modalTypes/ModalProps";

export interface IPropsEditTopInfo {
  isOpen: IPropsIsOpenModal;
  setIsOpen: Dispatch<SetStateAction<IPropsIsOpenModal>>;
}

export interface IPropsEditTableInfo {
  editData: any;
}
