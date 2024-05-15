import { TodayRegisterType } from "@/app/src/types/inputTypes/ModalInput";
import { IPropsModalSelect } from "@/app/src/types/inputTypes/ModalSelectInput";
import { Path } from "react-hook-form";

export default function TodayModalSelect<RT extends TodayRegisterType>(
  props: IPropsModalSelect<RT>
) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-start">
        <label htmlFor={props.el.labelName}>{props.el.label}</label>
      </div>
      <select
        {...props.register(props.el.labelName as Path<RT>)}
        name={props.el.labelName}
        className="w-5/6 h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
      >
        <option value="지출">지출</option>
        <option value="수입">수입</option>
      </select>
      <div className="w-5/6 font-bold text-sm text-red-500 text-left">
        {props.el.errMsg}
      </div>
    </div>
  );
}
