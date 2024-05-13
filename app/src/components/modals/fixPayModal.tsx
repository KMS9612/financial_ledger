import { useEffect, useRef, useState } from "react";
import { onChangeStateOfModal } from "../../lib/events/onChangeStateOfModal";
import { IPropsFixPayModal } from "../../types/modalTypes/fixedPayModalType";
import { PostFixedData } from "../../service/postFixedData";
import { getFixedData } from "../../service/getFixedData";
import ModaltInput from "../commons/inputs/modalInput";
import ModalCloseBtn from "../commons/buttons/modalCloseBtn";
import ModalPositiveBtn from "../commons/buttons/modalPositiveBtn";
import CircleLoading from "../loading/circleLoading";

interface IFixedData {
  income: number;
  saving: number;
  fixed: number;
  [key: string]: number;
}

export default function FixPayModal(props: IPropsFixPayModal) {
  const [isRequest, setIsRequest] = useState(false);
  const [fixedData, setFixedData] = useState<IFixedData>({
    income: 0,
    saving: 0,
    fixed: 0,
  });

  const incomeRef = useRef<HTMLInputElement>(null);
  const savingRef = useRef<HTMLInputElement>(null);
  const fixedRef = useRef<HTMLInputElement>(null);

  const inputObj = [
    {
      label: "월 고정수입",
      labelName: "income",
      inputAdd: "원",
      type: "number",
      ref: incomeRef,
    },
    {
      label: "월 저금금액",
      labelName: "saving",
      inputAdd: "원",
      type: "number",
      ref: savingRef,
    },
    {
      label: "월 고정지출",
      labelName: "fixed",
      inputAdd: "원",
      type: "number",
      ref: fixedRef,
    },
  ];

  const getFixedDataForDefault = async () => {
    const resData = await getFixedData();
    setFixedData(resData);
  };

  useEffect(() => {
    getFixedDataForDefault();
  }, []);

  // 저장버튼 클릭시 DB에 고정지출, 수입에 대한 정보를 저장하는 함수
  const onClickSaveFixedData = async () => {
    const fixedData = {
      income: Number(incomeRef.current?.value),
      saving: Number(savingRef.current?.value),
      fixed: Number(fixedRef.current?.value),
    };
    // 수입, 저금, 고정지출 input정보가 false가 아닐때만 작동
    if (!fixedData.income || !fixedData.saving || !fixedData.fixed) {
      alert("고정수입, 고정지출, 저금금액을 모두 입력해주세요.");
      return;
    }

    setIsRequest(true);
    try {
      await PostFixedData(fixedData);
      alert("저장완료");
      onChangeStateOfModal(
        "edit",
        false,
        props.isOpenObject,
        props.setIsOpenObject
      );
    } catch (err) {
      alert("저장 실패 다시 시도하세요");
      onChangeStateOfModal(
        "edit",
        false,
        props.isOpenObject,
        props.setIsOpenObject
      );
    }
    setIsRequest(false);
  };

  return (
    <div
      className={`${
        props.isOpenObject.edit
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute min-w-[380px] lg:w-96 h-fit py-10 bg-white top-1/2 left-1/2 shadow-xl -translate-x-1/2 -translate-y-1/2 text-center transition ease-in-out rounded-lg z-10`}
    >
      <div className="mb-10 text-lg font-bold">고정 비용 설정</div>
      <div className="flex flex-col justify-center items-center gap-10">
        {inputObj.map((el, index) => {
          return <ModaltInput key={el.labelName + index} el={el} />;
        })}
        <div className="w-5/6 flex flex-col gap-5">
          <ModalPositiveBtn
            disable={isRequest}
            btnText={isRequest ? <CircleLoading /> : "저장"}
            onClickEvent={onClickSaveFixedData}
          />
          <ModalCloseBtn
            btnText="닫기"
            onClickEvent={() =>
              onChangeStateOfModal(
                "edit",
                false,
                props.isOpenObject,
                props.setIsOpenObject
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
