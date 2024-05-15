import { IPropsSignUpFormInput } from "@/app/src/types/signupTypes/signupTypes";

export default function SignUpFormInput(props: IPropsSignUpFormInput) {
  return (
    <div className="w-full flex flex-col">
      <input
        {...props.register(props.el.id)}
        placeholder={props.el.placeholder}
        type={props.el.type}
        id={props.el.id}
        className="border-b outline-none pl-1"
      />
      <span className="text-red-700 font-bold text-xs">{props.el.errMsg}</span>
    </div>
  );
}
