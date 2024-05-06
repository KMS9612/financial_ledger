import { useRouter } from "next/navigation";
import { IPropsSignupForm } from "../../types/signupTypes/signupTypes";

export default function SignUpForm(props: IPropsSignupForm) {
  const router = useRouter();
  return (
    <div className="sm:m-w-1/4 w-96 h-[500px] bg-white flex flex-col justify-center items-center gap-8 rounded py-20 px-10">
      <span className="text-3xl text-slate-700 font-bold">회원가입</span>
      <div className="w-full flex flex-col">
        <input
          placeholder="Email"
          onChange={props.onChangeSetFormData}
          type="text"
          id="email"
          className="border-b outline-none pl-1"
        />
        {props.formData.email.isErr && (
          <span className="text-red-700 font-bold text-xs">
            {props.formData.email.errMessage}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <input
          placeholder="Password"
          onChange={props.onChangeSetFormData}
          type="password"
          id="pw"
          className="border-b outline-none pl-1"
        />
        {props.formData.pw.isErr && (
          <span className="text-red-700 font-bold text-xs">
            {props.formData.pw.errMessage}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col">
        <input
          placeholder="Password Check"
          onChange={props.onChangeSetFormData}
          type="password"
          id="pw_check"
          className="border-b outline-none pl-1"
        />
        {props.formData.pw_check.isErr && (
          <span className="text-red-700 font-bold text-xs">
            {props.formData.pw_check.errMessage}
          </span>
        )}
      </div>
      <div className="w-full flex flex-col gap-4">
        <button
          onClick={props.onClickSignUp}
          className="w-full h-12 rounded-full bg-slate-700 text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1"
        >
          회원가입
        </button>
        <button
          onClick={() => router.back()}
          className="w-full h-12 rounded-full border-2 border-slate-700 text-slate-700 font-bold transition duration-300 ease-in-out hover:-translate-y-1"
        >
          취소
        </button>
      </div>
    </div>
  );
}
