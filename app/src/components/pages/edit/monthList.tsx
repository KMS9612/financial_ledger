import { useRouter } from "next/navigation";
import { IPropsFetchedData } from "../../../types/editTypes/editTypes";
import { useEffect, useState } from "react";

export default function MonthList({ el }: { el: IPropsFetchedData }) {
  const router = useRouter();
  const [plus, setPlus] = useState({ plus: 0, minus: 0 });

  const onClickRouteDetail = () => {
    const target = el.month.replace("/", ".");
    router.push(`/edit/${target}`);
  };

  useEffect(() => {
    const calculatePlusOrMinus = () => {
      let plusC = 0;
      let minusC = 0;
      el.date.forEach((el) => {
        if (el.value.financial_type === "지출") {
          minusC++;
        } else if (el.value.financial_type === "수입") {
          plusC++;
        }
      });
      setPlus({ plus: plusC, minus: minusC });
    };

    calculatePlusOrMinus();
  }, []);
  return (
    <div
      onClick={onClickRouteDetail}
      className="w-full h-12 flex justify-center items-center rounded-md cursor-pointer px-2 py-2 transition ease-in-out hover:bg-gray-300 shadow-xl"
    >
      <div className="flex justify-center items-center w-1/4 font-bold ">
        {el.month}
      </div>
      <div className="flex justify-center font-semibold items-center w-1/4">
        {el.date.length}개의 등록정보
      </div>
      <div className="flex justify-center items-center w-1/4">
        <span className="font-bold text-positiveText">{plus.plus}</span>
        <span className="mx-2">/</span>
        <span className="font-bold text-nagativeText">{plus.minus}</span>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p className="font-bold text-gray-300">개발중입니다.</p>
      </div>
    </div>
  );
}
