"use client";
import { useState } from "react";
import EditModal from "../src/components/modals/editModal";
import TodayPayModal from "../src/components/modals/todayPayModal";

export default function EditPage() {
  const [isOpenEdit, setIsOpenEdit] = useState<Boolean>(false);
  const [isOpenToday, setIsOpenToday] = useState<Boolean>(false);

  return (
    <div className="relative h-full mx-auto flex flex-col pt-20 gap-8">
      <EditModal isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <TodayPayModal
        isOpenToday={isOpenToday}
        setIsOpenToday={setIsOpenToday}
      />
      <div className="flex justify-between items-end gap-20">
        <button
          onClick={() => setIsOpenEdit((prev) => !prev)}
          className="w-80 h-10 flex justify-center items-center border rounded transition ease-in-out hover:-translate-y-1"
        >
          고정 비용 설정
        </button>
        <button
          onClick={() => setIsOpenToday((prev) => !prev)}
          className="w-80 h-10 flex justify-center items-center border rounded transition ease-in-out hover:-translate-y-1"
        >
          오늘 입/출 등록
        </button>
      </div>
      <div className="table border">
        <div className="flex rounded">
          <div className="w-1/3 h-6 border text-center">일시</div>
          <div className="w-1/3 h-6 border text-center">종류</div>
          <div className="w-1/3 h-6 border text-center">사용처</div>
          <div className="w-1/3 h-6 border text-center">금액</div>
          <div className="w-1/3 h-6 border text-center">총액</div>
          <div className="w-1/6 h-6 border text-center">조작</div>
        </div>
        <div className="flex">
          <div className="w-1/3 h-6 border text-center">2023/11/29 23:17</div>
          <div className="w-1/3 h-6 border text-center">지출</div>
          <div className="w-1/3 h-6 border text-center">식비</div>
          <div className="w-1/3 h-6 border text-center">0</div>
          <div className="w-1/3 h-6 border text-center">0</div>
          <div className="w-1/6 h-6 border text-center">수정 / 삭제</div>
        </div>
      </div>
    </div>
  );
}
