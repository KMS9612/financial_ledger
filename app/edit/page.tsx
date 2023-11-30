"use client";
import { useState } from "react";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import { IPropsIsOpenModal } from "../src/types/modalTypes/ModalProps";

export default function EditPage() {
  const [isOpen, setIsOpen] = useState<IPropsIsOpenModal>({
    edit: false,
    today: false,
  });

  const onChangeStateOfModal = (
    modalType: keyof IPropsIsOpenModal,
    changeType: Boolean
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

  return (
    <div className="relative h-full mx-auto flex flex-col pt-20 gap-8 xl:px-20 md:px-5  ">
      <FixPayModal
        isOpenFunction={onChangeStateOfModal}
        isOpenObject={isOpen}
      />
      <TodayPayModal
        isOpenFunction={onChangeStateOfModal}
        isOpenObject={isOpen}
      />
      <div className="flex justify-between items-end gap-20">
        <button
          onClick={() => onChangeStateOfModal("edit", !isOpen.edit)}
          className="w-80 h-10 flex justify-center items-center border rounded transition ease-in-out hover:-translate-y-1"
        >
          고정 비용 설정
        </button>
        <button
          // onClick={() => setIsOpenToday((prev) => !prev)}
          onClick={() => onChangeStateOfModal("today", !isOpen.today)}
          className="w-80 h-10 flex justify-center items-center border rounded transition ease-in-out hover:-translate-y-1"
        >
          오늘 입/출 등록
        </button>
      </div>
      <div className="table border">
        <div className="flex rounded text-xs xl:text-sm sm:text-xs ">
          <div className="w-1/3 h-6 border flex justify-center items-center">
            일시
          </div>
          <div className="w-1/3 h-6 border flex justify-center items-center">
            종류
          </div>
          <div className="w-1/3 h-6 border flex justify-center items-center">
            사용처
          </div>
          <div className="w-1/3 h-6 border flex justify-center items-center">
            금액
          </div>
          <div className="w-1/3 h-6 border flex justify-center items-center">
            총액
          </div>
          <div className="w-1/6 h-6 border flex justify-center items-center">
            조작
          </div>
        </div>
        <div className="flex text-xs xl:text-sm sm:text-xs">
          <div className="w-1/3 border flex justify-center items-center h-16 lg:h-8">
            2023/11/29 23:17
          </div>
          <div className="w-1/3 border flex justify-center items-center h-16 lg:h-8">
            지출
          </div>
          <div className="w-1/3 border flex justify-center items-center h-16 lg:h-8">
            식비
          </div>
          <div className="w-1/3 border flex justify-center items-center h-16 lg:h-8">
            0
          </div>
          <div className="w-1/3 border flex justify-center items-center h-16 lg:h-8">
            0
          </div>
          <div className="w-1/6 border flex flex-col justify-center items-center h-16 lg:h-8 gap-2 lg:gap-4 lg:flex-row">
            <button className="w-5/6 lg:w-1/2 border rounded">수정</button>
            <button className="w-5/6 lg:w-1/2 border rounded">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
