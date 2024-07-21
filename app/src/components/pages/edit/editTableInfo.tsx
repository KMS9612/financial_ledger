import { IEditDataFull } from "@/app/src/types/editTypes/editTypes";
import MonthList from "./monthList";
import CircleLoading from "../../loading/circleLoading";
import useFinancailData from "@/app/src/lib/hooks/useFinancailData";
import { sortEditData } from "@/app/src/lib/sort/sortEditData";
import EditListHeader from "../../commons/list/editListHeader";

export default function EditTableInfo() {
  let { editData } = useFinancailData();
  let sortedEditData = sortEditData(editData);

  const tableHeaders = ["날짜", "등록 갯 수", "수입 / 지출", "통계(+/-)"];

  return (
    <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4">
      {editData.length !== 0 ? (
        <div className="w-full flex flex-col gap-2">
          <div className="divide-x-2 divide-slate-400 w-full h-12 flex justify-center items-center rounded-md px-2 py-2 shadow-xl">
            {tableHeaders.map((headerName) => (
              <EditListHeader
                key={headerName}
                headerText={headerName}
                lastHeaderText={tableHeaders[tableHeaders.length - 1]}
              />
            ))}
          </div>
          <div className="w-full h-full flex flex-col shadow-xl rounded-lg shadow-xl gap-4 p-2 overflow-auto">
            {sortedEditData.map((el: IEditDataFull, index: number) => (
              <MonthList key={el.month + index} el={el} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <CircleLoading />
        </div>
      )}
    </div>
  );
}
