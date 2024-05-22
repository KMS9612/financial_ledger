import { useChangeStateOfModals } from "@/app/src/lib/hooks/useChangeStateOfModals";
import { clickedEditDetail } from "@/app/src/recoil/store/clickedEditDetail";
import { IPropsTableInfoItems } from "@/app/src/types/editTypes/tableInfoItemsTypes";
import { useSetRecoilState } from "recoil";

export default function TableInfoItems(props: IPropsTableInfoItems) {
  const { changeModalState } = useChangeStateOfModals();
  const setClickedEdit = useSetRecoilState(clickedEditDetail);

  return (
    <div
      onClick={() => {
        changeModalState("editDetail", true);
        setClickedEdit(props.el);
      }}
      className="min-w-[600px] flex text-xs xl:text-sm sm:text-xs border-b-2 border-l-2 border-r-2 hover:bg-gray-300 cursor-pointer"
    >
      <div className="w-1/3 flex border-r justify-center items-center h-16 lg:h-8">
        {props.el.day}일
      </div>
      <div className="w-1/3 flex border-r justify-center items-center h-16 lg:h-8">
        {props.el.value.financial_type}
      </div>
      <div className="w-1/3 flex border-r justify-center items-center h-16 lg:h-8">
        {props.el.value.place}
      </div>
      <div className="w-1/3 flex justify-center items-center h-16 lg:h-8">
        {props.el.value.amount} 원
      </div>
    </div>
  );
}
