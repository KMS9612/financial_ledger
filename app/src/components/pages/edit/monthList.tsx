import { useRouter } from "next/navigation";
import { IEditDataFull } from "../../../types/editTypes/editTypes";
import { useEffect, useState } from "react";

export default function MonthList({ el }: { el: IEditDataFull }) {
  const router = useRouter();
  const [plus, setPlus] = useState({ plus: 0, minus: 0 });
  const [total, setTotal] = useState({ plusCount: 0, minusCount: 0 });

  const onClickRouteDetail = () => {
    const target = el.month.replace("/", ".");
    router.push(`/edit/${target}`);
  };

  useEffect(() => {
    const calculatePlusOrMinus = () => {
      let plusC = 0;
      let plusT = 0;
      let minusC = 0;
      let minusT = 0;

      el.date.forEach((el) => {
        if (el.value.financial_type === "지출") {
          minusC++;
          minusT += el.value.amount;
        } else if (el.value.financial_type === "수입") {
          plusC++;
          plusT += el.value.amount;
        }
      });
      setPlus({ plus: plusC, minus: minusC });
      setTotal({ plusCount: plusT, minusCount: minusT });
    };

    calculatePlusOrMinus();
  }, [el.date]);
  return (
    <div
      onClick={onClickRouteDetail}
      className="w-full text-sm sm:text-lg h-12 flex justify-center items-center rounded-md cursor-pointer px-2 py-2 transition ease-in-out hover:bg-gray-300 shadow-xl"
    >
      <div className="flex border-r justify-center items-center w-1/4 font-bold ">
        {el.month}
      </div>
      <div className="flex border-r justify-center font-semibold items-center w-1/4">
        {el.date.length}개
      </div>
      <div className="flex border-r justify-center items-center w-1/4">
        <span className="font-bold text-positiveText">{plus.plus}</span>
        <span className="mx-2">/</span>
        <span className="font-bold text-nagativeText">{plus.minus}</span>
      </div>
      <div className="flex justify-center items-center w-1/4">
        <p className="font-bold">
          <span className="text-positiveText">{total.plusCount}</span>원 /{" "}
          <span className="text-nagativeText">{total.minusCount}</span>원
        </p>
      </div>
    </div>
  );
}
