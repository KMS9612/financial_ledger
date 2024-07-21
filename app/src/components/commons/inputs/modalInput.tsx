import {
  IPropsModalInput,
  RegisterType,
} from "@/app/src/types/inputTypes/ModalInput";
import { Path } from "react-hook-form";

export default function ModalInput<RT extends RegisterType>(
  props: IPropsModalInput<RT>
) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-start">
        <label htmlFor={props.el.labelName}>{props.el.label}</label>
      </div>
      <div className="relative w-5/6 h-10">
        <input
          {...props.register(props.el.labelName as Path<RT>)}
          autoComplete="off"
          type={props.el.type}
          defaultValue={props.el.defaultVal}
          id={props.el.labelName}
          name={props.el.labelName}
          className="w-full h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none dark:bg-stone-400"
        />
        {props.el.type !== "date" && (
          <span className="absolute top-2 right-2 text-gray-400 dark:text-white">
            {props.el.inputAdd}
          </span>
        )}
      </div>
      <div className="w-5/6 flex justify-start">
        <span className="font-bold text-sm text-red-500">
          {props.el.errMsg}
        </span>
      </div>
    </div>
  );
}
