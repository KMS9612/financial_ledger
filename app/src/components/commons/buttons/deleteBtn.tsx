import { IPropsDeleteBtn } from "@/app/src/types/components/commons/buttonTypes/deleteBtnType";
import CircleLoading from "../../loading/circleLoading";

export default function DeleteBtn(props: IPropsDeleteBtn) {
  return (
    <button
      disabled={props.isLoading}
      className={`${
        props.isLoading ? "bg-gray-600" : "bg-red-400"
      } w-full h-[40px] flex justify-center items-center border-2 rounded-lg font-bold text-white outline-none`}
      type={props.type}
      onClick={props.onClickEvent}
    >
      {props.isLoading ? <CircleLoading /> : props.btnText}
    </button>
  );
}
