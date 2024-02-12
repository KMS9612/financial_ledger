import { ITableData } from "../src/types/editTypes/tableType";

export default function TableInfomation({
  tableData,
}: {
  tableData: Array<ITableData>;
}) {
  return (
    <div className="w-full overflow-auto">
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
        <div
          key={el.value.amount + index}
          className="min-w-[600px] flex text-xs xl:text-sm sm:text-xs border-b-2 border-l-2 border-r-2"
        >
          <div className="w-1/3 flex border-r justify-center items-center h-16 lg:h-8">
            {el.day}일
          </div>
          <div className="w-1/3 flex border-r justify-center items-center h-16 lg:h-8">
            {el.value.financial_type}
          </div>
          <div className="w-1/3 flex border-r justify-center items-center h-16 lg:h-8">
            {el.value.place}
          </div>
          <div className="w-1/3 flex justify-center items-center h-16 lg:h-8">
            {el.value.amount} 원
          </div>
        </div>
      ))}
    </div>
  );
}
