import { IPropsEditTableInfo } from "@/app/src/types/editTypes/editPageTypes";
import { IPropsFetchedData } from "@/app/src/types/editTypes/editTypes";
import MonthList from "./monthList";
import CircleLoading from "../../loading/circleLoading";

export default function EditTableInfo(props: IPropsEditTableInfo) {
  return (
    <div className="w-full flex flex-wrap justify-center lg:justify-start gap-4">
      {props.editData.length !== 0 ? (
        props.editData.map((el: IPropsFetchedData, index: number) => (
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
