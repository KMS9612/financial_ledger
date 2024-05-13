import { IPropsModalInput } from "@/app/src/types/inputTypes/ModalInput";

export default function ModalInput(props: IPropsModalInput) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-start">
        <label htmlFor={props.el.labelName}>{props.el.label}</label>
      </div>
      <div className="relative w-5/6 h-10">
        <input
          autoComplete="false"
          ref={props.el.ref}
          type={props.el.type}
          name={props.el.labelName}
          className="w-full h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
        />
        {props.el.type !== "date" && (
          <span className="absolute top-2 right-2 text-gray-400">
            {props.el.inputAdd}
          </span>
        )}
      </div>
    </div>
  );
}
