import { IPropsFetchedData } from "@/app/src/types/editTypes/editTypes";
import MonthList from "./monthList";
import CircleLoading from "../../loading/circleLoading";
import useFinancailData from "@/app/src/lib/hooks/useFinancailData";
import { sortEditData } from "@/app/src/lib/sort/sortEditData";

export default function EditTableInfo() {
  let { editData } = useFinancailData();
  editData = sortEditData(editData);

  return (
    <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4">
      {editData.length !== 0 ? (
        editData.map((el: IPropsFetchedData, index: number) => (
          <MonthList key={el.month + index} el={el} />
        ))
      ) : (
        <div className="w-full flex justify-center items-center">
          <CircleLoading />
        </div>
      )}
    </div>
  );
}
