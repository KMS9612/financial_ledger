import { ChangeEvent, useEffect, useState } from "react";
import { IPropsFixPayModal } from "../../types/modalTypes/ModalProps";
import api from "@/app/src/service/instance";
import { onChangeStateOfModal } from "../../lib/events/onChangeStateOfModal";

interface IFixedData {
  income: number;
  saving: number;
  fixed: number;
  [key: string]: number;
}

export default function FixPayModal(props: IPropsFixPayModal) {
  const [fixedData, setFixedData] = useState<IFixedData>({
    income: 0,
    saving: 0,
    fixed: 0,
  });

  const inputObj = [
    { label: "월 고정수입", labelName: "income", type: "number" },
    { label: "월 저금금액", labelName: "saving", type: "number" },
    { label: "월 고정지출", labelName: "fixed", type: "number" },
  ];

  useEffect(() => {
    let params = { email: sessionStorage.getItem("email") };
    api
      .get("/fix/fetchFixedData", { params })
      .then((res) => {
        setFixedData(res.data.fixedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeSetFixedData = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    let newObj = { ...fixedData };
    newObj[target.name] = parseInt(target.value);
    setFixedData(newObj);
  };

  // 저장버튼 클릭시 DB에 고정지출, 수입에 대한 정보를 저장하는 함수
  const onClickSaveFixedData = () => {
    // 수입, 저금, 고정지출 input정보가 0이 아닐때만 작동
    if (!fixedData.income || !fixedData.saving || !fixedData.fixed) {
      alert("고정수입, 고정지출, 저금금액을 모두 입력해주세요.");
      return;
    }
    let email = sessionStorage.getItem("email");
    const params = {
      email: email,
      income: fixedData.income,
      saving: fixedData.saving,
      fixed: fixedData.fixed,
    };

    api
      .post("/fix/createFixedData", params)
      .then((res) => {
        alert("저장완료");
        onChangeStateOfModal(
          "edit",
          false,
          props.isOpenObject,
          props.setIsOpenObject
        );
      })
      .catch((err) => {
        alert("저장실패 다시 시도하세요.");
        onChangeStateOfModal(
          "edit",
          false,
          props.isOpenObject,
          props.setIsOpenObject
        );
      });
  };

  return (
    <div
      className={`${
        props.isOpenObject.edit
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute w-screen min-w-[380px] lg:w-96 h-fit py-10 bg-white border-slate-700 border-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition ease-in-out rounded z-10`}
    >
      <div className="mb-10 text-lg font-bold">고정 비용 설정</div>
      <div className="flex flex-col justify-center items-center gap-10">
        {inputObj.map((el) => {
          return (
            <div key={el.label} className="relative flex flex-col text-left">
              <div className="relative flex flex-col max-w-fit">
                <label htmlFor={el.labelName}>{el.label}</label>
                <input
                  autoComplete={"off"}
                  value={fixedData[el.labelName]}
                  onChange={onChangeSetFixedData}
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
          <button
            className="w-80 lg:w-60 h-10 border rounded"
            onClick={onClickSaveFixedData}
          >
            저장
          </button>
          <button
            className="w-80 lg:w-60 h-10 border rounded"
            onClick={() => {
              onChangeStateOfModal(
                "edit",
                false,
                props.isOpenObject,
                props.setIsOpenObject
              );
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
