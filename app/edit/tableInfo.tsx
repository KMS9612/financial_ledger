interface IPropsTableInfo {}

export default function TableInfomation({
  financialData,
}: {
  financialData: any;
}) {
  return (
    <div className="flex text-xs xl:text-sm sm:text-xs">
      <div className="w-1/3 flex border-r border-slate-600 justify-center items-center h-16 lg:h-8">
        2023/11/29 23:17
      </div>
      <div className="w-1/3 flex border-r border-slate-600 justify-center items-center h-16 lg:h-8">
        지출
      </div>
      <div className="w-1/3 flex border-r border-slate-600 justify-center items-center h-16 lg:h-8">
        식비
      </div>
      <div className="w-1/3 flex border-r border-slate-600 justify-center items-center h-16 lg:h-8">
        0
      </div>
      <div className="w-1/3 flex border-r border-slate-600 justify-center items-center h-16 lg:h-8">
        0
      </div>
      <div className="w-1/6 flex border-r border-slate-600 flex-col justify-center items-center h-16 lg:h-8 gap-2 lg:gap-4 lg:flex-row">
        <button className="w-5/6 bg-slate-600 text-white font-bold border rounded-md lg:w-1/2">
          수정
        </button>
        <button className="w-5/6 bg-slate-600 text-white font-bold border rounded-md lg:w-1/2">
          삭제
        </button>
      </div>
    </div>
  );
}
