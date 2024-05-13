import { IPropsModalSelect } from "@/app/src/types/inputTypes/ModalSelectInput";

export default function TodayModalSelect(props: IPropsModalSelect) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-start">
        <label htmlFor={props.el.labelName}>{props.el.label}</label>
      </div>
      <select
        ref={props.el.ref}
        name={props.el.labelName}
        className="w-5/6 h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
      >
        <option value="지출">지출</option>
        <option value="수입">수입</option>
      </select>
    </div>
  );
}
