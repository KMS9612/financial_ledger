import { IPropsFetchedData } from "@/app/src/types/editTypes/editTypes";
import MonthList from "./monthList";
import CircleLoading from "../../loading/circleLoading";
import useFinancailData from "@/app/src/lib/hooks/useFinancailData";
import { sortEditData } from "@/app/src/lib/sort/sortEditData";

export default function EditTableInfo() {
  let { editData } = useFinancailData();
  editData = sortEditData(editData);

  return (
    <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4">
      {editData.length !== 0 ? (
        <div className="w-full flex flex-col gap-2">
          <div className="w-full h-12 flex justify-center items-center rounded-md px-2 py-2 border-2 border-slate-400">
            <div className="w-1/4 font-bold flex justify-center items-center">
              날짜
            </div>
            <div className="w-1/4 font-bold flex justify-center items-center">
              등록갯수
            </div>
            <div className="w-1/4 font-bold flex justify-center items-center">
              수입 / 지출 (개)
            </div>
            <div className="w-1/4 font-bold flex justify-center items-center">
              조작
            </div>
          </div>
          <div className="w-full h-full flex flex-col border-2 border-slate-400 rounded-lg shadow-xl gap-4 p-2 overflow-auto">
            {editData.map((el: IPropsFetchedData, index: number) => (
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
