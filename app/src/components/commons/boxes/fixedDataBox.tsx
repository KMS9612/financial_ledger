import { FixedDataTypeGuard } from "@/app/src/types/fixedTypes/fixedDataType";
import useFinancailData from "@/app/src/lib/hooks/useFinancailData";
import TextSkeleton from "../../loading/textSkeleton";

export default function FixedDataBox() {
  const { fixedData } = useFinancailData();

  const dataMap = [
    {
      innerText: "고정수입",
      dataField: !FixedDataTypeGuard(fixedData) ? (
        <TextSkeleton />
      ) : (
        fixedData.income
      ),
    },
    {
      innerText: "고정지출",
      dataField: !FixedDataTypeGuard(fixedData) ? (
        <TextSkeleton />
      ) : (
        fixedData.fixed
      ),
    },
    {
      innerText: "저금",
      dataField: !FixedDataTypeGuard(fixedData) ? (
        <TextSkeleton />
      ) : (
        fixedData.saving
      ),
    },
  ];

  return (
    <div className="flex flex-row flex-wrap gap-2 items-center">
      {dataMap.map((el) => (
        <div
          key={el.innerText}
          className="border-2 border-slate-600 font-bold rounded-md h-10 flex justify-center items-center px-10 text-xs lg:text-base min-w-full xl:min-w-[215px]"
        >
          {el.innerText}: {el.dataField} 원
        </div>
      ))}
    </div>
  );
}
