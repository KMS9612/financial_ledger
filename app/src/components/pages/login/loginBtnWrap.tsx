import { IPropsLoginBtnWrap } from "@/app/src/types/loginTypes/loginBtnWrapTypes";
import CircleLoading from "../../loading/circleLoading";
import { useRouter } from "next/navigation";

export default function LoginBtnWrap(props: IPropsLoginBtnWrap) {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <button
        type="button"
        onClick={props.onClickTestAccountLogin}
        className="w-5/6 h-12 rounded-md bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-700 text-white font-bold transition duration-600 ease-in-out hover:-translate-y-1"
      >
        테스트계정 사용
      </button>
      <button
        disabled={props.loginLoading}
        type="submit"
        className={`w-5/6 h-12 flex justify-center items-center rounded-md ${
          props.loginLoading
            ? "bg-gray-400"
            : "bg-gradient-to-tl from-slate-400 to-slate-600 hover:from-slate-500 hover:to-slate-700"
        } text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1`}
      >
        {props.loginLoading ? <CircleLoading /> : "로그인"}
      </button>
      <button
        type="button"
        onClick={() => router.push("/signup")}
        className="w-5/6 h-12 rounded-md border-2 border-slate-700 text-slate-700 font-bold transition duration-300 ease-in-out hover:-translate-y-1"
      >
        회원가입
      </button>
    </div>
  );
}
