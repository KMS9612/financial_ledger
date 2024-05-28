import { IPropsGradientBtn } from "@/app/src/types/components/commons/buttonTypes/gradientBtnType";
import CircleLoading from "../../loading/circleLoading";

export default function GradientBtn(props: IPropsGradientBtn) {
  return (
    <button
      type={props.type}
      disabled={props.isDisabled || props.isLoading}
      onClick={props.onClickEvent}
      className={`${
        props.isDisabled || props.isLoading
          ? "bg-gray-400"
          : "bg-gradient-to-br from-slate-400 to-slate-700"
      } w-full h-12 flex justify-center items-center rounded-lg text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1`}
    >
      {props.isLoading ? <CircleLoading /> : props.btnInnerText}
    </button>
  );
}
