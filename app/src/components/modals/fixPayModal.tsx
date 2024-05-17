import { MouseEvent, useEffect, useRef, useState } from "react";
import { PostFixedData } from "../../service/postFixedData";
import { getFixedData } from "../../service/getFixedData";
import ModaltInput from "../commons/inputs/modalInput";
import ModalCloseBtn from "../commons/buttons/modalCloseBtn";
import ModalPositiveBtn from "../commons/buttons/modalPositiveBtn";
import CircleLoading from "../loading/circleLoading";
import { useForm } from "react-hook-form";
import { fixPayModalSchema } from "../../schema/modalSchema/fixPayModalSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IParamsFixedData } from "../../types/fixedTypes/fixedDataType";
import GradientBtn from "../commons/buttons/gradientBtn";
import { useChangeStateOfModals } from "../../lib/hooks/useChangeStateOfModals";

export default function FixPayModal() {
  const [isRequest, setIsRequest] = useState(false);
  const [getDefaultLoading, setGetDefaultLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(fixPayModalSchema) });
  const { isOpen, changeModalState } = useChangeStateOfModals();

  const inputObj = [
    {
      label: "월 고정수입",
      labelName: "income",
      inputAdd: "원",
      type: "number",
      defaultVal: 0,
      errMsg: errors.income?.message,
    },
    {
      label: "월 저금금액",
      labelName: "saving",
      inputAdd: "원",
      type: "number",
      defaultVal: 0,
      errMsg: errors.saving?.message,
    },
    {
      label: "월 고정지출",
      labelName: "fixed",
      inputAdd: "원",
      type: "number",
      defaultVal: 0,
      errMsg: errors.fixed?.message,
    },
  ];

  // 초기값 및 비용 불러오기 버튼을 누를때 고정비용을 불러와 input값으로 넣어주는 함수
  const getFixedDataForDefault = async (
    event?: MouseEvent<HTMLButtonElement>
  ) => {
    event?.preventDefault();
    setGetDefaultLoading(true);
    const resData = await getFixedData();

    if (resData) {
      setValue("income", resData["income"]);
      setValue("fixed", resData["fixed"]);
      setValue("saving", resData["saving"]);
    }
    setGetDefaultLoading(false);
  };

  useEffect(() => {
    getFixedDataForDefault();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 저장버튼 클릭시 DB에 고정지출, 수입에 대한 정보를 저장하는 함수
  const onClickSaveFixedData = async (data: IParamsFixedData) => {
    const fixedData = {
      income: data.income,
      saving: data.saving,
      fixed: data.fixed,
    };
    // 수입, 저금, 고정지출 input정보가 false가 아닐때만 작동
    if (!fixedData.income || !fixedData.saving || !fixedData.fixed) return;

    setIsRequest(true);
    try {
      await PostFixedData(fixedData);
      alert("저장완료");
      changeModalState("edit", false);
    } catch (err) {
      alert("저장 실패 다시 시도하세요");
      changeModalState("edit", false);
    }
    setIsRequest(false);
  };

  // form submit handling 함수
  const onSubmitHandleForm = handleSubmit((data) => {
    onClickSaveFixedData(data);
  });

  return (
    <div
      className={`${
        isOpen.edit
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute min-w-[380px] lg:w-96 h-fit py-10 bg-white top-1/2 left-1/2 shadow-xl -translate-x-1/2 -translate-y-1/2 text-center transition ease-in-out rounded-lg z-10`}
    >
      <div className="mb-10 text-lg font-bold">
        고정 비용 설정
        <br />
      </div>
      <form
        onSubmit={onSubmitHandleForm}
        className="flex flex-col justify-center items-center gap-10"
      >
        {inputObj.map((el, index) => {
          return (
            <ModaltInput
              key={el.labelName + index}
              el={el}
              register={register}
              errors={errors}
            />
          );
        })}
        <div className="w-5/6 flex flex-col gap-5">
          <GradientBtn
            btnInnerText="내 비용 불러오기"
            onClickEvent={getFixedDataForDefault}
            isLoading={getDefaultLoading}
          ></GradientBtn>

          <ModalPositiveBtn
            type="submit"
            disable={isRequest}
            btnText={isRequest ? <CircleLoading /> : "저장"}
          />
          <ModalCloseBtn
            type="button"
            btnText="닫기"
            onClickEvent={() => {
              changeModalState("edit", false);
            }}
          />
        </div>
      </form>
    </div>
  );
}
