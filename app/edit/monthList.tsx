import Image from "next/image";
import { IPropsFetchedData } from "../src/types/editTypes/editTypes";
import TableInfomation from "./tableInfo";

export default function MonthList({ el }: { el: IPropsFetchedData }) {
  return (
    <div className="w-full flex justify-between items-center border-2 border-slate-700 rounded-md cursor-pointer px-2 py-2">
      <Image
        src={"/arrowRight.png"}
        alt={"월별 데이터 리스트 내부 화살표"}
        width={30}
        height={50}
      />
      <span>{el.month}</span>
      <Image
        src={"/arrowLeft.png"}
        alt={"월별 데이터 리스트 내부 화살표"}
        width={30}
        height={50}
      />
    </div>
  );
}
