import { IPropsLoginForm } from "@/app/src/types/loginTypes/loginFormTypes";
import LoginFormInput from "./loginFormInput";

export default function LoginForm(props: IPropsLoginForm) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      {props.inputData.map((el, index) => (
        <LoginFormInput
          key={el.id + index}
          el={el}
          register={props.register}
          errors={props.errors}
        />
      ))}
    </div>
  );
}
