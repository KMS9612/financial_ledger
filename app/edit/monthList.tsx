import { useRouter } from "next/navigation";
import { IPropsFetchedData } from "../src/types/editTypes/editTypes";

export default function MonthList({ el }: { el: IPropsFetchedData }) {
  const router = useRouter();

  const onClickRouteDetail = () => {
    // const monthData = JSON.stringify(el);
    const target = el.month.replace("/", ".");
    router.push(`/edit/${target}`);
  };
  return (
    <div
      onClick={onClickRouteDetail}
      className="min-w-[300px] w-1/6 h-48 flex justify-center items-center bg-slate-700 rounded-md cursor-pointer px-2 py-2 transition ease-in-out hover:-translate-y-1"
    >
      <span className="font-bold text-white">{el.month} 가계부</span>
    </div>
  );
}
