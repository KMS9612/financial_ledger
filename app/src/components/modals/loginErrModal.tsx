import { Dispatch, SetStateAction } from "react";

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
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute w-2/4 h-fit top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-600 p-5 transition duration-600 ease-in-out z-20`}
    >
      <span className="text-white font-bold text-4xl">알림</span>
      <div className="text-white my-6 text-lg">{text}</div>
      <div className="w-full text-right">
        <button
          onClick={() => setIsOpen(false)}
          className="w-24 h-8 rounded-md bg-white text-slate-600 font-bold text-lg transition ease-in-out duration-600 hover:-translate-y-1"
        >
          확인
        </button>
      </div>
    </div>
  );
}
