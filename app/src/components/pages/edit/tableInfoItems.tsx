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
      className="w-full text-xs lg:text-lg h-12 flex justify-center items-center rounded-md cursor-pointer px-2 py-2 transition ease-in-out hover:bg-gray-300 shadow-xl"
    >
      <div className="w-1/4 font-semibold flex border-r justify-center items-center h-16 lg:h-8">
        {props.el.day}일
      </div>
      <div
        className={`${
          props.el.value.financial_type === "수입"
            ? "text-positiveText"
            : "text-nagativeText"
        } w-1/4 font-semibold flex border-r justify-center items-center h-16 lg:h-8`}
      >
        {props.el.value.financial_type}
      </div>
      <div className="w-1/4 font-semibold flex border-r justify-center items-center h-16 lg:h-8">
        {props.el.value.place}
      </div>
      <div className="w-1/4 font-semibold flex justify-center items-center h-16 lg:h-8">
        {props.el.value.amount} 원
      </div>
    </div>
  );
}
