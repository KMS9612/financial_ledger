import { useRef, useState } from "react";
import { IPropsTodayModal } from "../../types/modalTypes/todayPayModalType";
import CircleLoading from "../loading/circleLoading";
import { useSetRecoilState } from "recoil";
import { editDataState } from "../../recoil/store/financialData";
import { getAllFinancial } from "../../service/getAllFinancial";
import { postEditData } from "../../service/postEditData";
import ModaltInput from "../commons/inputs/modalInput";
import TodayModalSelect from "../commons/inputs/todayModalSelects";

export default function TodayPayModal({
  isOpenFunction,
  isOpenObject,
}: IPropsTodayModal) {
  // 연속 클릭 방지 및 로딩 상태 파악용 State
  const [isRequest, setIsRequest] = useState<boolean>(false);

  // 일일 정보 등록 후 리스트 최신화를 위한 recoilState
  const setEditData = useSetRecoilState(editDataState);

  // Edit에 필요한 Input의 정보를 모아놓은 객체
  const dateRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const placeRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const inputObj = [
    {
      label: "등록일시",
      inputAdd: "일/시",
      labelName: "date",
      type: "date",
      ref: dateRef,
    },
    {
      label: "종류",
      inputAdd: "종류",
      labelName: "type",
      type: "select",
      ref: typeRef,
    },
    {
      label: "출처",
      inputAdd: "출처",
      labelName: "place",
      type: "text",
      ref: placeRef,
    },
    {
      label: "금액",
      inputAdd: "원",
      labelName: "amount",
      type: "number",
      ref: amountRef,
    },
  ];

  // InputValue 리셋
  const resetInputValues = () => {
    const date = dateRef.current?.value;
    const type = typeRef.current?.value;
    const amount = amountRef.current?.value;
    const place = placeRef.current?.value;
    if (!date || !type || !place || !amount) {
      return;
    }
    dateRef.current.value = "";
    typeRef.current.value = "";
    amountRef.current.value = "";
    placeRef.current.value = "";
  };

  const onClickSendRequest = async () => {
    const date = dateRef.current?.value;
    const type = typeRef.current?.value;
    const amount = amountRef.current?.value;
    const place = placeRef.current?.value;

    if (!date || !type || !place || !amount) {
      alert("입력내용을 모두 입력해 주세요");
      return;
    }
    const formData = { date, type, amount: Number(amount), place };
    await postEditData(formData);
    // 등록 후 값 초기화
    resetInputValues();

    // 연속 클릭 방지용 상태
    setIsRequest(true);
    // 서버 등록 후 editList를 최신화 하기위한 recoilState값 변경
    let newEdit = await getAllFinancial();
    setEditData(newEdit);
    // todayModal 종료 함수
    isOpenFunction("today", false);
    // 등록버튼의 로딩 상태
    setIsRequest(false);
  };

  return (
    <div
      className={`${
        isOpenObject.today
          ? "opacity-100  pointer-events-auto"
          : "opacity-0  pointer-events-none"
      }
      absolute min-w-[380px] lg:w-96 h-fit py-10 bg-white border-slate-700 border-2 top-1/2 left-1/2 w-1/5 -translate-x-1/2 -translate-y-1/2 text-center transition ease-in-out rounded z-10`}
    >
      <div className="mb-10 text-lg font-bold">오늘 지출 등록</div>
      <div className="flex flex-col justify-center items-center gap-10">
        {inputObj.map((el, index) =>
          el.label !== "종류" ? (
            <ModaltInput el={el} key={el.labelName + index} />
          ) : (
            <TodayModalSelect el={el} key={el.labelName + index} />
          )
        )}
        <div className="flex flex-col gap-5">
          <button
            disabled={isRequest}
            onClick={onClickSendRequest}
            className={`${
              isRequest && "bg-gray-300 cursor-wait"
            } w-80 lg:w-60 h-10 flex justify-center items-center border rounded`}
          >
            {isRequest ? <CircleLoading /> : "저장"}
          </button>
          <button
            className="w-80 lg:w-60 h-10 border rounded"
            onClick={() => {
              isOpenFunction("today", false);
              // 인풋 밸류 초기화
              resetInputValues();
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
