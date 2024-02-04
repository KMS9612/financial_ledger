interface IPropsResultSmall {
  title: string;
  subText: string;
}

export default function ResultBoxSmall(props: IPropsResultSmall) {
  return (
    <div className="w-96 h-24 flex flex-col justify-between rounded-lg shadow-lg p-2 border">
      <div className="text-2xl text-slate-700 font-bold">{props.title}</div>
      <div className="w-full overflow-auto flex justify-end items-center">
        {/* 지출, 수익의 텍스트 색상 변환을 위한 로직 */}
        {props.title === "고정비용" ? (
          <span className="text-lg font-bold">0</span>
        ) : (
          <span
            className={`text-lg font-bold ${
              props.title === "이번 달 총 지출"
                ? "text-lime-600"
                : "text-red-600"
            }`}
          >
            0
          </span>
        )}
        <span className="text-lg font-bold">원</span>
      </div>
    </div>
  );
}
