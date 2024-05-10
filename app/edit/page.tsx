"use client";
import { useState } from "react";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import { IPropsIsOpenModal } from "../src/types/modalTypes/ModalProps";
import useFinancailData from "../src/lib/hooks/useFinancailData";
import { sortEditData } from "../src/lib/sort/sortEditData";
import EditTopInfo from "../src/components/pages/edit/editTopInfo";
import EditTableInfo from "../src/components/pages/edit/editTableInfo";

export default function EditPage() {
  const [isOpen, setIsOpen] = useState<IPropsIsOpenModal>({
    edit: false,
    today: false,
  });

  // 일일등록 모달과 고정비용 모달의 on/off를 조절하는 함수
  // const onChangeStateOfModal = (
  //   modalType: keyof IPropsIsOpenModal,
  //   changeType: boolean
  // ) => {
  //   let newObject = { ...isOpen };
  //   for (let i of Object.keys(newObject)) {
  //     if (i === modalType) {
  //       newObject[i as keyof IPropsIsOpenModal] = changeType;
  //     } else {
  //       newObject[i as keyof IPropsIsOpenModal] = false;
  //     }
  //   }
  //   setIsOpen(newObject);
  // };

  // 해당 유저가 등록한 모든 일일 가계부 정보를 불러오고 정렬시키는 부분
  let { editData } = useFinancailData();
  editData = sortEditData(editData);

  return (
    <div className="w-full relative h-screen flex flex-col pt-10 px-10 gap-8">
      <FixPayModal isOpenObject={isOpen} setIsOpenObject={setIsOpen} />
      <TodayPayModal isOpenObject={isOpen} setIsOpenObject={setIsOpen} />
      {/* Top Infomation / Buttons */}
      <EditTopInfo isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Table Infomation */}
      <EditTableInfo editData={editData} />
    </div>
  );
}
