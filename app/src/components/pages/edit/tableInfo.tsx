import TableInfoItems from "./tableInfoItems";
import CircleLoading from "../../loading/circleLoading";
import { useGetTableData } from "@/app/src/lib/hooks/useGetTableData";
import EditListHeader from "../../commons/list/editListHeader";

export default function TableInfomation() {
  const { tableData }: { tableData: Array<any> } = useGetTableData();
  const tableHeaders = ["일시", "종류", "사용처", "금액"];
  return (
    <div className="w-full flex flex-col gap-2 overflow-auto px-10 py-4">
      <div className="w-full">
        {/* Table Top */}
        <div className="w-full h-12 flex justify-center items-center rounded-md px-2 py-2 border-2 border-slate-400">
          {tableHeaders.map((headerName) => (
            <EditListHeader
              key={headerName}
              headerText={headerName}
              lastHeaderText={tableHeaders[tableHeaders.length - 1]}
            />
          ))}
        </div>
      </div>
      {/* 클릭된 년/월에 대한 데이터 기입하기 */}

      {tableData.length > 0 ? (
        <div className="w-full h-full flex flex-col border-2 border-slate-400 rounded-lg shadow-xl gap-4 p-2 overflow-auto">
          {tableData.map((el, index) => (
            <TableInfoItems key={el._id + index} el={el} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <CircleLoading />
        </div>
      )}
    </div>
  );
}
