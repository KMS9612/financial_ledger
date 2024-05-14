import { IPropsLoginFormInput } from "@/app/src/types/loginTypes/loginFormTypes";

export default function LoginFormInput(props: IPropsLoginFormInput) {
  if (props.el.id !== "id" && props.el.id !== "pw") return <div>hello</div>;
  const currentID = props.el.id;

  const errMessage = {
    id: props.errors.id?.message,
    pw: props.errors.pw?.message,
  };
  return (
    <div className="w-5/6 flex flex-col justify-center items-center">
      <label
        className={`w-full text-gray-500 transition ease-in-out duration-150 cursor-text`}
        htmlFor={props.el.id}
      >
        {props.el.labelName}
      </label>
      <input
        {...props.register(props.el.id)}
        type={props.el.type}
        id={props.el.id}
        name={props.el.id}
        className="w-full h-8 border-b bg-transparent outline-none pl-1"
      />
      <div className="w-full">
        <span className="text-red-500 text-sm font-bold h-[10px]">
          {errMessage[currentID]}
        </span>
      </div>
    </div>
  );
}
