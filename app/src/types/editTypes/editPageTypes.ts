import { IPropsIsOpenModal } from "../modalTypes/ModalProps";

export interface IPropsEditTopInfo {
  onChangeStateOfModal: (
    modalType: keyof IPropsIsOpenModal,
    changeType: boolean
  ) => void;
  isOpen: IPropsIsOpenModal;
}

export interface IPropsEditTableInfo {
  editData: any;
}
