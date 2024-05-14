import { IPropsModalInput } from "@/app/src/types/inputTypes/ModalInput";

export default function ModalInput(props: IPropsModalInput) {
  if (
    props.el.labelName !== "income" &&
    props.el.labelName !== "fixed" &&
    props.el.labelName !== "saving"
  )
    return;

  const currentName = props.el.labelName;
  const errMessages = {
    income: props.errors?.income?.message,
    fixed: props.errors?.fixed?.message,
    saving: props.errors?.saving?.message,
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-start">
        <label htmlFor={props.el.labelName}>{props.el.label}</label>
      </div>
      <div className="relative w-5/6 h-10">
        <input
          {...props.register(props.el.labelName)}
          autoComplete="false"
          type={props.el.type}
          defaultValue={props.el.defaultVal}
          id={props.el.labelName}
          name={props.el.labelName}
          className="w-full h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
        />
        {props.el.type !== "date" && (
          <span className="absolute top-2 right-2 text-gray-400">
            {props.el.inputAdd}
          </span>
        )}
      </div>
      <div className="w-5/6 flex justify-start">
        <span className="font-bold text-sm text-red-500">
          {errMessages[currentName]}
        </span>
      </div>
    </div>
  );
}
