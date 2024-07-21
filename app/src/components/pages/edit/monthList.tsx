import { useRouter } from "next/navigation";
import { IEditDataFull } from "../../../types/editTypes/editTypes";
import { MouseEvent, useEffect, useState } from "react";
import calculateForUnit from "@/app/src/lib/calculates/calculateForUnit";
import GradientBtn from "../../commons/buttons/gradientBtn";

export default function MonthList({ el }: { el: IEditDataFull }) {
  const router = useRouter();
  const [plus, setPlus] = useState({ plus: 0, minus: 0 });
  const [total, setTotal] = useState({ plusCount: 0, minusCount: 0 });
  const [showTotal, setShowTotal] = useState(false);

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

  const onClickCheckTotal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowTotal(true);
    setTimeout(() => {
      setShowTotal(false);
    }, 1500);
  };
  return (
    <div
      onClick={onClickRouteDetail}
      className="relative divide-x-2 divide-slate-400 dark:bg-stone-600 w-full text-xs sm:text-lg h-14 flex justify-center items-center rounded-md cursor-pointer px-2 py-2 transition ease-in-out hover:bg-gray-300 dark:hover:bg-stone-500 shadow-xl"
    >
      <div className="flex justify-center items-center w-1/4 font-bold ">
        {el.month}
      </div>
      <div className="flex justify-center font-semibold items-center w-1/4">
        {el.date.length}개
      </div>
      <div className="flex justify-center items-center w-1/4">
        <span className="font-bold text-positiveText">{plus.plus}</span>
        <span className="mx-2">/</span>
        <span className="font-bold text-nagativeText">{plus.minus}</span>
      </div>
      <div className="sm:relative static flex justify-center items-center w-1/4">
        <button
          className="w-3/4 rounded-lg border-2 border-slate-500 hover:bg-slate-500 hover:text-white font-semibold"
          onClick={onClickCheckTotal}
        >
          통계확인
        </button>
        <p
          className={`${
            showTotal ? "opacity-100" : "opacity-0 pointer-events-none"
          } absolute top-50 left-0 w-full bg-white font-bold text-center flex flex-col rounded-lg border-2 border-slate-500`}
        >
          <span className="text-positiveText">
            {total.plusCount !== 0 ? calculateForUnit(total.plusCount) : "0원"}
          </span>
          <span className="text-nagativeText">
            {total.minusCount !== 0
              ? calculateForUnit(total.minusCount)
              : "0원"}
          </span>
        </p>
      </div>
    </div>
  );
}
