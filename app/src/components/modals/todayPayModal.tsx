import { useState } from "react";
import { FormData } from "../../types/modalTypes/todayPayModalType";
import CircleLoading from "../loading/circleLoading";
import { postEditData } from "../../service/postEditData";
import ModalInput from "../commons/inputs/modalInput";
import TodayModalSelect from "../commons/inputs/todayModalSelects";
import ModalPositiveBtn from "../commons/buttons/modalPositiveBtn";
import ModalCloseBtn from "../commons/buttons/modalCloseBtn";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { todayPayModalSchema } from "../../schema/modalSchema/todayPayModalSchema";
import { useChangeStateOfModals } from "../../lib/hooks/useChangeStateOfModals";
import useFinancailData from "../../lib/hooks/useFinancailData";

export default function TodayPayModal() {
  const { refetchData } = useFinancailData();
  // 연속 클릭 방지 및 로딩 상태 파악용 State
  const [isRequest, setIsRequest] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todayPayModalSchema),
  });
  const { isOpen, changeModalState } = useChangeStateOfModals();

  const inputObj = [
    {
      label: "등록일시",
      inputAdd: "일/시",
      labelName: "date",
      type: "date",
      errMsg: errors.date?.message,
    },
    {
      label: "종류",
      inputAdd: "종류",
      labelName: "type",
      type: "select",
      errMsg: errors.type?.message,
    },
    {
      label: "출처",
      inputAdd: "출처",
      labelName: "place",
      type: "text",
      errMsg: errors.place?.message,
    },
    {
      label: "금액",
      inputAdd: "원",
      labelName: "amount",
      type: "number",
      errMsg: errors.amount?.message,
    },
  ];

  // InputValue 리셋
  const resetInputValues = () => {
    resetField("amount");
    setValue("type", "지출");
    resetField("date");
    resetField("place");
  };

  const onClickSendRequest = async (data: FormData) => {
    if (!data.date || !data.type || !data.place || !data.amount) {
      alert("입력내용을 모두 입력해 주세요");
      return;
    }
    // 연속 클릭 방지용 요청 로딩 상태
    setIsRequest(true);

    const formData = {
      date: data.date,
      type: data.type,
      amount: Number(data.amount),
      place: data.place,
    };
    await postEditData(formData);
    // 등록 후 값 초기화
    resetInputValues();
    // 서버 등록 후 editList를 최신화 하기위한 useFinancialData 재 작동
    refetchData();
    // todayModal 종료 함수
    changeModalState("edit", false);
    // 등록버튼의 로딩 상태
    setIsRequest(false);
  };

  const onSubmit = handleSubmit((data) => {
    onClickSendRequest(data);
  });

  return (
    <div
      className={`${
        isOpen.today
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute top-0 left-0 w-full h-full z-20 transition ease-in-out `}
    >
      {/* 모달활성화 배경 */}
      <div className="absolute w-full h-full bg-gray-700 opacity-50"></div>
      <div
        className={`absolute min-w-[380px] lg:w-96 h-fit py-10 bg-white top-1/2 left-1/2 w-1/5 shadow-lg -translate-x-1/2 -translate-y-1/2 text-center rounded-lg z-10`}
      >
        <div className="mb-10 text-lg font-bold">오늘 지출 등록</div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-center items-center gap-10"
        >
          {inputObj.map((el, index) =>
            el.label !== "종류" ? (
              <ModalInput
                el={el}
                key={el.labelName + index}
                register={register}
              />
            ) : (
              <TodayModalSelect
                el={el}
                key={el.labelName + index}
                register={register}
              />
            )
          )}
          <div className="w-5/6 flex flex-col gap-5">
            <ModalPositiveBtn
              type="submit"
              disable={isRequest}
              btnText={isRequest ? <CircleLoading /> : "저장"}
            />
            <ModalCloseBtn
              type="button"
              btnText="닫기"
              onClickEvent={() => {
                changeModalState("today", false);
                // 인풋 밸류 초기화
                resetInputValues();
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
