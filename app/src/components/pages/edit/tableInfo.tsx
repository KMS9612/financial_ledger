import { ITableData } from "../../../types/editTypes/tableType";
import TableInfoItems from "./tableInfoItems";

export default function TableInfomation({
  tableData,
}: {
  tableData: Array<ITableData>;
}) {
  return (
    <div className="w-full overflow-auto px-10 py-4">
      <div className="w-full table min-w-[600px]">
        {/* Table Top */}
        <div className="flex bg-slate-600 text-white font-bold text-xs xl:text-sm sm:text-xs">
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            일시
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            종류
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            사용처
          </div>
          <div className="w-1/3 h-6 flex justify-center items-center">금액</div>
        </div>
      </div>
      {/* 클릭된 년/월에 대한 데이터 기입하기 */}
      {tableData.map((el, index) => (
        <TableInfoItems key={el.id + index} el={el} />
      ))}
    </div>
  );
}
