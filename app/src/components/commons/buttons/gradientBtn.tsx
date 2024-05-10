import { IPropsGradientBtn } from "@/app/src/types/components/commons/buttonTypes/gradientBtnType";

export default function GradientBtn(props: IPropsGradientBtn) {
  return (
    <button
      onClick={props.onClickEvent}
      className="w-full h-12 rounded-lg bg-gradient-to-br from-slate-400 to-slate-700 text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1"
    >
      {props.btnInnerText}
    </button>
  );
}
