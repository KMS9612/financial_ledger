import { SetStateAction } from "react";
import { IPropsIsOpenModal } from "../../types/modalTypes/ModalProps";

export default function FixPayModal({
  isOpenFunction,
  isOpenObject,
}: {
  isOpenFunction: (
    modalType: keyof IPropsIsOpenModal,
    changeType: boolean
  ) => void;
  isOpenObject: IPropsIsOpenModal;
}) {
  const inputObj = [
    { label: "수입", labelName: "income", type: "number" },
    { label: "저금", labelName: "income", type: "number" },
    { label: "고정지출", labelName: "income", type: "number" },
  ];

  return (
    <div
      className={`${
        isOpenObject.edit
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute w-screen lg:w-96 h-fit py-10 bg-white border-2 top-1/2 left-1/2 w-1/5 -translate-x-1/2 -translate-y-1/2 text-center transition ease-in-out rounded z-10`}
    >
      <div className="mb-10 text-lg font-bold">고정 비용 설정</div>
      <div className="flex flex-col justify-center items-center gap-10">
        {inputObj.map((el) => {
          return (
            <div key={el.label} className="relative flex flex-col text-left">
              <div className="relative flex flex-col max-w-fit">
                <label htmlFor={el.labelName}>{el.label}</label>
                <input
                  type={el.type}
                  name={el.labelName}
                  className="w-80 lg:w-60 h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
                />
                <span className="absolute top-8 right-2 text-gray-400">원</span>
              </div>
            </div>
          );
        })}
        <div className="flex flex-col gap-5">
          <button className="w-80 lg:w-60 h-10 border rounded">저장</button>
          <button
            className="w-80 lg:w-60 h-10 border rounded"
            onClick={() => {
              isOpenFunction("edit", false);
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
