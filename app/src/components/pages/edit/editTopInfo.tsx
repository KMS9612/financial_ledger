import { IPropsEditTopInfo } from "@/app/src/types/editTypes/editPageTypes";

export default function EditTopInfo(props: IPropsEditTopInfo) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
      <div>
        <h2 className="font-bold text-xl text-slate-700">
          지출 / 수입 표 형식 가계부
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row gap-5">
        <button
          onClick={() => props.onChangeStateOfModal("edit", !props.isOpen.edit)}
          className="w-80 h-10 flex justify-center items-center border-2 border-slate-600 rounded text-slate-600 font-bold transition ease-in-out hover:-translate-y-1"
        >
          고정 비용 설정
        </button>
        <button
          onClick={() =>
            props.onChangeStateOfModal("today", !props.isOpen.today)
          }
          className="w-80 h-10 flex justify-center items-center border-2 border-slate-600 rounded text-slate-600 font-bold transition ease-in-out hover:-translate-y-1"
        >
          오늘 입/출 등록
        </button>
      </div>
    </div>
  );
}
