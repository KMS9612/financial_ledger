"use client";
import { useState } from "react";

type FocusOBJ = {
  id: Boolean;
  pw: Boolean;
  [key: string]: Boolean;
};

type UserDataOBJ = {
  id: String;
  pw: String;
  [key: string]: String;
};

export default function LoginPage() {
  const [isFocus, setIsFocus] = useState<FocusOBJ>({ id: false, pw: false });
  const [userData, setUserData] = useState<UserDataOBJ>({
    id: "",
    pw: "",
  });

  const onFocusInput = (inputType: String) => {
    let newObj = { ...isFocus };
    if (inputType === "id") {
      newObj.id = true;
    } else if (inputType === "pw") {
      newObj.pw = true;
    }
    setIsFocus(newObj);
  };
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

  const onChangeSetState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputID = event.currentTarget.id;
    let newObj = { ...userData };
    newObj[inputID] = event.currentTarget.value;
    setUserData(newObj);
  };

  const onClickLogin = () => {
    // 백엔드 작업 끝난 후 userData를 전달해서 로그인 로직 시작
    // jwt토큰은 sessionStorage에 저장
  };
  return (
    <div className="container w-full h-full flex justify-center items-center mx-auto">
      <div className="w-2/4 flex flex-col justify-center items-center border-4 border-slate-700 rounded py-20 gap-20">
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
              id="pw"
              type="password"
              className="w-full border-b-2 outline-none"
            />
          </div>
        </div>
        {/* Login Form End */}
        <div className="w-full flex flex-col justify-center items-center gap-6">
          <button className="w-5/6 h-12 rounded-full bg-slate-700 text-white font-bold transition duration-300 ease-in-out hover:-translate-y-1">
            로그인
          </button>
          <button className="w-5/6 h-12 rounded-full border-4 border-slate-700 text-slate-700 font-bold transition duration-300 ease-in-out hover:-translate-y-1">
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
