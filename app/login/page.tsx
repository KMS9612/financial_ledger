"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginErrModal from "../src/components/modals/loginErrModal";

type FocusOBJ = {
  id: boolean;
  pw: boolean;
  [key: string]: boolean;
};

type UserDataOBJ = {
  id: string;
  pw: string;
  [key: string]: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isFocus, setIsFocus] = useState<FocusOBJ>({ id: false, pw: false });
  const [userData, setUserData] = useState<UserDataOBJ>({
    id: "",
    pw: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");

  // 로그인 Input이 focus되었을때 작동하는 함수 (애니메이션 용)
  const onFocusInput = (inputType: string) => {
    let newObj = { ...isFocus };
    if (inputType === "id") {
      newObj.id = true;
    } else if (inputType === "pw") {
      newObj.pw = true;
    }
    setIsFocus(newObj);
  };

  // 로그인 Input이 Blur(focus out)되었을때 작동하는 함수 (애니메이션 용)
  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>) => {
    let newObj = { ...isFocus };
    if (event.currentTarget.value) {
      return;
    } else {
      const id = event.currentTarget.id;
      newObj[id] = false;
    }
    setIsFocus(newObj);
  };

  // Input의 값이 변경될대 해당값을 State에 저장하는 함수
  const onChangeSetState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputID = event.currentTarget.id;
    let newObj = { ...userData };
    newObj[inputID] = event.currentTarget.value;
    setUserData(newObj);
  };

  // 로그인 버튼 클릭시 로그인 요청을 보내는 함수
  const onClickLogin = async () => {
    const email = userData.id;
    const password = userData.pw;

    await axios
      .post("https://ggb-back-0b82d9178398.herokuapp.com/login", {
        email,
        password,
      })
      .then((res) => {
        // jwt토큰과 유저정보는 sessionStorage에 저장
        sessionStorage.setItem("access", JSON.stringify(res.data.accessToken));
        sessionStorage.setItem(
          "refresh",
          JSON.stringify(res.data.refreshToken)
        );
        sessionStorage.setItem("email", JSON.stringify(res.data.email));
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        setErrText(err.response.data.message);
        setIsOpen(true);
      });
  };

  const onClickTestAccountLogin = async () => {
    setIsFocus({ id: true, pw: true });
    setUserData({
      id: "test@naver.com",
      pw: "test",
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center pt-20">
      <LoginErrModal text={errText} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        onClick={onClickTestAccountLogin}
        className="sm:w-96 w-full sm:m-h-4/5 h-full flex flex-col justify-center items-center border-4 border-slate-700 rounded py-20 gap-20"
      >
        <span className="text-3xl text-slate-700 font-bold">Login</span>
        {/* Login Form */}
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <div className="w-5/6 relative flex justify-center items-center">
            <label
              className={`${
                isFocus.id && "-translate-y-5"
              } absolute bottom-0 left-0 text-gray-500 transition ease-in-out duration-150 cursor-text`}
              htmlFor="id"
            >
              ID
            </label>
            <input
              onFocus={() => onFocusInput("id")}
              onBlur={(event) => onBlurInput(event)}
              onChange={onChangeSetState}
              value={userData.id}
              type="text"
              id="id"
              className="w-full border-b-2 outline-none"
            />
          </div>
          <div className="w-5/6 relative flex justify-center items-center">
            <label
              className={`${
                isFocus.pw && "-translate-y-5"
              } absolute bottom-0 left-0 text-gray-500 transition duration-150 ease-in-out cursor-text`}
              htmlFor="pw"
            >
              Password
            </label>
            <input
              onChange={onChangeSetState}
              onFocus={() => onFocusInput("pw")}
              onBlur={(event) => onBlurInput(event)}
              value={userData.pw}
              id="pw"
              type="password"
              className="w-full border-b-2 outline-none"
            />
          </div>
        </div>
        {/* Login Form End */}
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <button className="w-5/6 h-12 rounded-full bg-slate-700 text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1">
            테스트계정 사용
          </button>
          <button
            onClick={onClickLogin}
            className="w-5/6 h-12 rounded-full bg-slate-700 text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1"
          >
            로그인
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="w-5/6 h-12 rounded-full border-2 border-slate-700 text-slate-700 font-bold transition duration-300 ease-in-out hover:-translate-y-1"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
