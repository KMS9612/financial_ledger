import { FixedDataTypeGuard } from "@/app/src/types/fixedTypes/fixedDataType";
import TextSkeleton from "../../loading/textSkeleton";
import { useRecoilValue } from "recoil";
import { fixedDataState } from "@/app/src/recoil/store/financialData";
import CircleLoading from "../../loading/circleLoading";
import calculateForUnit from "@/app/src/lib/calculates/calculateForUnit";

export default function ResultFixDataBox() {
  const fixedData = useRecoilValue(fixedDataState);

  // fixedData가 기본값 / 빈값 / 에러 상태일때 circleLoading을 반환하는 예외처리
  if (
    fixedData === null ||
    fixedData === undefined ||
    !FixedDataTypeGuard(fixedData)
  )
    return <CircleLoading />;

  const fixDataObj = [
    {
      title: "고정지출",
      data: fixedData.fixed,
      textColor: "text-nagativeText",
    },
    {
      title: "고정수입",
      data: fixedData.income,
      textColor: "text-positiveText",
    },
    {
      title: "저금",
      data: fixedData.saving,
      textColor: "text-black dark:text-white",
    },
  ];

  return (
    <div className="min-w-[200px] border rounded-lg w-full overflow-auto flex flex-col justify-end items-start px-4 shadow-lg p-2 gap-6">
      <h2 className="text-2xl text-slate-700 dark:text-white font-bold">
        고정비용
      </h2>
      <div className="w-full flex flex-col justify-between text-lg dark:text-white font-bold">
        {fixDataObj.map((el) => (
          <div key={el.title} className="flex justify-between">
            <span>{el.title}</span>
            <span className={`${el.textColor}`}>
              {isNaN(el.data) ? <TextSkeleton /> : calculateForUnit(el.data)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
