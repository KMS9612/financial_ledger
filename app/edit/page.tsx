"use client";
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
    <div className="w-full relative h-full flex flex-col gap-8 animate-fade animate-once">
      {/* <FixPayModal /> */}
      {/* <TodayPayModal /> */}
      {/* Top Infomation / Buttons */}
      {/* Table Infomation */}
      <EditTableInfo />
    </div>
  );
}
