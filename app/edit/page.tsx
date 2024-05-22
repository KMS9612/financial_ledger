"use client";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import EditTopInfo from "../src/components/pages/edit/editTopInfo";
import EditTableInfo from "../src/components/pages/edit/editTableInfo";

export default function EditPage() {
  // 해당 유저가 등록한 모든 일일 가계부 정보를 불러오고 정렬시키는 부분

  return (
    <div className="w-full relative h-screen flex flex-col pt-10 px-10 gap-8">
      <FixPayModal />
      <TodayPayModal />
      {/* Top Infomation / Buttons */}
      <EditTopInfo />
      {/* Table Infomation */}
      <EditTableInfo />
    </div>
  );
}
