import { IPropsResultTodayDataBox } from "@/app/src/types/resultlTypes/resultBoxSmall";
import TextSkeleton from "../../loading/textSkeleton";

export default function ResultTodayDataBox(props: IPropsResultTodayDataBox) {
  return (
    <div className="w-full flex flex-col justify-between rounded-lg shadow-lg p-2 border gap-6">
      <div className="text-2xl text-slate-700 font-bold">{props.el.title}</div>
      <div className="min-w-[300px] w-full overflow-auto flex justify-end items-center gap-4 px-4">
        <span
          className={`text-lg font-bold ${
            props.el.title !== "이번 달 총 지출"
              ? props.el.data >= 0
                ? "text-positiveText"
                : "text-nagativeText"
              : "text-nagativeText"
          }`}
        >
          {isNaN(props.el.data) ? <TextSkeleton /> : props.el.data}
        </span>
        <span className="text-lg font-bold">원</span>
      </div>
    </div>
  );
}