import { IPropsLoginFormInput } from "@/app/src/types/loginTypes/loginFormTypes";

export default function LoginFormInput(props: IPropsLoginFormInput) {
  return (
    <div className="w-5/6 flex flex-col justify-center items-center">
      <label
        className={`w-full text-gray-500 transition ease-in-out duration-150 cursor-text`}
        htmlFor="id"
      >
        {props.el.labelName}
      </label>
      <input
        ref={props.el.ref}
        type="text"
        id={props.el.id}
        className="w-full h-8 border-b bg-transparent outline-none pl-1"
      />
    </div>
  );
}
