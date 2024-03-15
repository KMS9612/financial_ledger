interface IPropsResultSmall {
  title: string;
  subText: string;
  data: any;
}

export default function ResultBoxSmall(props: IPropsResultSmall) {
  return (
    <div className="w-full flex flex-col justify-between rounded-lg shadow-lg p-2 border gap-6">
      <div className="text-2xl text-slate-700 font-bold">{props.title}</div>
      {/* 지출, 수익의 텍스트 색상 변환을 위한 로직 */}
      {props.title === "고정비용" ? (
        <div className="min-w-[300px] w-full overflow-auto flex flex-col justify-end items-start px-4">
          <div className="w-full flex justify-between text-lg font-bold">
            <span>고정지출</span>
            <span className="text-red-600">{props.data.fixed}</span>
          </div>
          <div className="w-full flex justify-between text-lg font-bold">
            <span>고정수입</span>
            <span className="text-lime-600">{props.data.income}</span>
          </div>
          <div className="w-full flex justify-between text-lg font-bold">
            <span>저금</span>
            <span>{props.data.saving}</span>
          </div>
        </div>
      ) : (
        <div className="min-w-[300px] w-full overflow-auto flex justify-end items-center gap-4 px-4">
          <span
            className={`text-lg font-bold ${
              props.title !== "이번 달 총 지출"
                ? props.data >= 0
                  ? "text-lime-600"
                  : "text-red-600"
                : "text-red-600"
            }`}
          >
            {props.data}
          </span>
          <span className="text-lg font-bold">원</span>
        </div>
      )}
    </div>
  );
}
