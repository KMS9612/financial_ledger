import { useRouter } from "next/navigation";
import { IPropsSignupForm } from "../../../types/signupTypes/signupTypes";
import SignUpFormInput from "../../pages/signup/signUpFormInput";
import GradientBtn from "../buttons/gradientBtn";

export default function SignUpForm(props: IPropsSignupForm) {
  const router = useRouter();
  return (
    <div className="sm:w-1/3 w-full h-full bg-white flex flex-col justify-center items-center gap-8 px-10">
      <span className="text-3xl text-slate-700 font-bold">회원가입</span>
      {props.signUpFormInputData.map((el, index) => (
        <SignUpFormInput
          key={el.id + index}
          el={el}
          register={props.register}
        />
      ))}

      <div className="w-full flex flex-col gap-4">
        <GradientBtn
          type="submit"
          btnInnerText="회원가입"
          isLoading={props.isLoading}
        />
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full h-12 rounded-md border-2 border-slate-700 text-slate-700 font-bold transition duration-300 ease-in-out hover:-translate-y-1"
        >
          취소
        </button>
      </div>
    </div>
  );
}
