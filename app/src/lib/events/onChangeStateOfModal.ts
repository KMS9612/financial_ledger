import { Dispatch, SetStateAction } from "react";
import { IPropsIsOpenModal } from "../../types/modalTypes/ModalProps";

export const onChangeStateOfModal = (
  // 일일등록 모달과 고정비용 모달의 on/off를 조절하는 함수
  modalType: keyof IPropsIsOpenModal,
  changeType: boolean,
  isOpen: IPropsIsOpenModal,
  setIsOpen: Dispatch<SetStateAction<IPropsIsOpenModal>>
) => {
  let newObject = { ...isOpen };
  for (let i of Object.keys(newObject)) {
    if (i === modalType) {
      newObject[i as keyof IPropsIsOpenModal] = changeType;
    } else {
      newObject[i as keyof IPropsIsOpenModal] = false;
    }
  }
  setIsOpen(newObject);
};
