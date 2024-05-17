import { IPropsIsOpenModal } from "../../types/modalTypes/ModalProps";
import { useRecoilState } from "recoil";
import { isOpenModal } from "../../recoil/store/isOpenModal";

// 모달의 상태를 변경하는 함수와 해당 모달의 상태를 나타내는 객체를 반환하는 커스텀 훅
export const useChangeStateOfModals = () => {
  const [isOpen, setIsOpen] = useRecoilState(isOpenModal);

  /** 모달의 상태를 변경하는 함수 (modalType: 상태를 변경할 모달의 이름, changeType변경할 상태에 대한 블린값 ex.false / true) */
  const changeModalState = (
    modalType: keyof IPropsIsOpenModal,
    changeType: boolean
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

  return { isOpen, changeModalState };
};
