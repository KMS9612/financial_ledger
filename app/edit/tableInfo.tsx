export default function TableInfomation() {
  return (
    <div className="w-full">
      <div className="w-full table border rounded-md border-slate-600">
        {/* Table Top */}
        <div className="flex border-b border-slate-600 bg-slate-600 text-white font-bold text-xs xl:text-sm sm:text-xs ">
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            일시
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            종류
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            사용처
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            금액
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            총액
          </div>
          <div className="w-1/6 h-6 border-r flex justify-center items-center">
            조작
          </div>
        </div>
      </div>
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
    </div>
  );
}
