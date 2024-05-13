import { Dispatch, SetStateAction } from "react";
import { FocusOBJ } from "../../types/loginTypes/loginPageTypes";

export default function LoginErrModal({
  text,
  isOpen,
  setIsOpen,
}: {
  text: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`${
        isOpen
          ? "block opacity-100 pointer-events-auto"
          : "hidden opacity-0 pointer-events-none"
      } absolute w-full h-full`}
    >
      <div className="absolute w-full h-full bg-gray-700 opacity-50"></div>
      <div
        className={`absolute w-[300px] h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-5 transition duration-600 ease-in-out z-20`}
      >
        <span className="text-slate-600 font-bold text-4xl">알림</span>
        <div className="my-6 text-lg">{text}</div>
        <div className="w-full text-right">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="w-24 h-8 rounded-md bg-white text-slate-600 border-2 border-slate-600 font-bold text-lg transition ease-in-out duration-600 hover:-translate-y-1"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
