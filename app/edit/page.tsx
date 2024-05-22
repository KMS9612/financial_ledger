"use client";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import EditTopInfo from "../src/components/pages/edit/editTopInfo";
import EditTableInfo from "../src/components/pages/edit/editTableInfo";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { tableDataState } from "../src/recoil/store/tableData";

export default function EditPage() {
  const setTableData = useSetRecoilState(tableDataState);
  useEffect(() => {
    setTableData([]);
  });

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
