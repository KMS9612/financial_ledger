"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import SignUpAlertModal from "../src/components/modals/signUpModal";
interface IFormSignupInner {
  text: string;
  isErr: boolean;
  errMessage: string;
}

interface IFormSignup {
  email: IFormSignupInner;
  pw: IFormSignupInner;
  pw_check: IFormSignupInner;
  [key: string]: IFormSignupInner;
}

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormSignup>({
    email: { text: "", isErr: false, errMessage: "" },
    pw: { text: "", isErr: false, errMessage: "" },
    pw_check: { text: "", isErr: false, errMessage: "" },
  });
  const [modalText, setModalText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChangeSetFormData = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const newObj = { ...formData };
    newObj[target.id].text = target.value;
    setFormData(newObj);
  };

  // 회원가입 버튼을 누른후 작동하는 FormData의 형식을 확인하는 함수
  const checkFormData = () => {
    const newObj = { ...formData };
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isPass = true;

    // email형식에 맞는지 확인하는 부분
    if (!emailReg.test(newObj.email.text)) {
      setFormData((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          isErr: true,
          errMessage: "이메일 형식에 맞지 않습니다.",
        },
      }));
      isPass = false;
    }

    // 이메일을 입력했는지 확인하는 부분
    if (!newObj.email.text) {
      setFormData((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          isErr: true,
          errMessage: "이메일을 입력해주세요",
        },
      }));
      isPass = false;
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인하는 코드, pw와 pw_check가 입력됬는지 확인하는 코드
    if (newObj.pw.text !== newObj.pw_check.text) {
      setFormData((prev) => ({
        ...prev,
        pw: {
          ...prev.pw,
          isErr: true,
          errMessage: "비밀번호가 일치하지 않습니다.",
        },
        pw_check: {
          ...prev.pw_check,
          isErr: true,
          errMessage: "비밀번호가 일치하지 않습니다.",
        },
      }));
      isPass = false;
    }

    // 비밀번호가 입력됬는지 확인하는 부분
    if (!newObj.pw.text) {
      setFormData((prev) => ({
        ...prev,
        pw: {
          ...prev.pw,
          isErr: true,
          errMessage: "비밀번호를 입력해 주세요.",
        },
      }));
      isPass = false;
    }

    // 비밀번호확인이 입력됬는지 확인하는 부분
    if (!newObj.pw_check.text) {
      setFormData((prev) => ({
        ...prev,
        pw_check: {
          ...prev.pw_check,
          isErr: true,
          errMessage: "비밀번호를 확인해 주세요.",
        },
      }));
      isPass = false;
    }

    // 모두 통과했다면 true반환
    return isPass;
  };

  const onClickSignUp = () => {
    // 이메일형식,비밀번호 일치 확인
    const isPass = checkFormData();

    if (isPass) {
      // 회원가입 Post요청 보내기
      const email = formData.email.text;
      const password = formData.pw.text;
      axios
        .post("http://localhost:8080/createUser", { email, password })
        .then((res) => {
          // Modal 표시하기
          setIsOpen(true);
          setModalText(res.data.message);
        })
        .catch((err) => {
          // Modal 표시하기
          setIsOpen(true);
          setModalText(err.response.data.message);
        });
    }
  };

  return (
    <div className="relative container mx-auto w-full h-full flex justify-center items-center pt-10">
      <SignUpAlertModal
        text={modalText}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="w-1/4 h-3/4 flex flex-col justify-center items-center gap-8 border-4 border-slate-700 rounded py-20 px-10">
        <span className="text-3xl text-slate-700 font-bold">회원가입</span>
        <div className="w-full flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={onChangeSetFormData}
            type="text"
            id="email"
            className="border-2 rounded-md pl-2"
          />
          {formData.email.isErr && (
            <span className="text-red-700 font-bold text-xs">
              {formData.email.errMessage}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="pw">비밀번호</label>
          <input
            onChange={onChangeSetFormData}
            type="password"
            id="pw"
            className="border-2 rounded-md pl-2"
          />
          {formData.pw.isErr && (
            <span className="text-red-700 font-bold text-xs">
              {formData.pw.errMessage}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label htmlFor="email">비밀번호 확인</label>
          <input
            onChange={onChangeSetFormData}
            type="password"
            id="pw_check"
            className="border-2 rounded-md pl-2"
          />
          {formData.pw_check.isErr && (
            <span className="text-red-700 font-bold text-xs">
              {formData.pw_check.errMessage}
            </span>
          )}
        </div>
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={onClickSignUp}
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
    </div>
  );
}
