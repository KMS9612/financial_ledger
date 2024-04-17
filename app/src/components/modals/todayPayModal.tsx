import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { IPropsTodayModal } from "../../types/modalTypes/todayPayModalType";
import api from "@/app/axios/instance";
import CircleLoading from "../loading/circleLoading";

export default function TodayPayModal({
  isOpenFunction,
  isOpenObject,
  setFormData,
  formData,
  fetchTableData,
}: IPropsTodayModal) {
  // 연속 클릭 방지 및 로딩 상태 파악용 State
  const [isRequest, setIsRequest] = useState<boolean>(false);
  // Edit에 필요한 Input의 정보를 모아놓은 객체
  const inputObj = [
    {
      label: "등록일시",
      inputAdd: "일/시",
      labelName: "date",
      type: "text",
    },
    { label: "종류", inputAdd: "종류", labelName: "type", type: "select" },
    {
      label: "출처",
      inputAdd: "출처",
      labelName: "place",
      type: "text",
    },
    { label: "금액", inputAdd: "원", labelName: "amount", type: "number" },
  ];

  const onChangeSetState = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormData({ ...formData, [name]: value });
  };

  const onClickSendRequest = async () => {
    if (
      !formData.date ||
      !formData.place ||
      !formData.type ||
      !formData.amount
    ) {
      alert("입력내용을 모두 입력해 주세요");
      return;
    }

    // 23.12.25 추후 연달아 클릭하는 거 방지하는 기능 필요함
    // 24.04.17 연속 클릭 방지 추가
    setIsRequest(true);

    const email = sessionStorage.getItem("email");
    await api
      .post("/edit/createEdit", {
        email: email,
        date: formData.date.replaceAll("-", "/"),
        financial_type: formData.type,
        amount: formData.amount,
        place: formData.place,
      })
      .then(() => {
        // 요청 후 input 초기화
        setFormData({ date: "", type: "지출", amount: 0, place: "" });
      })
      .catch((err) => {
        console.log(err);
      });
    isOpenFunction("today", false);
    setIsRequest(false);
    fetchTableData();
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
        {inputObj.map((el) => {
          if (el.type !== "select") {
            return (
              <div key={el.label} className="relative flex flex-col text-left">
                <div className="relative flex flex-col max-w-fit">
                  <label htmlFor={el.labelName}>{el.label}</label>
                  {el.label === "등록일시" ? (
                    <input
                      type="date"
                      name={el.labelName}
                      value={formData[el.labelName]}
                      onChange={onChangeSetState}
                      className="w-80 lg:w-60 h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
                    />
                  ) : (
                    <div>
                      <input
                        type={el.type}
                        name={el.labelName}
                        value={formData[el.labelName]}
                        onChange={onChangeSetState}
                        className="w-80 lg:w-60 h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
                      />
                      <span className="absolute top-8 right-2 text-gray-400">
                        {el.inputAdd}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return (
              <div key={el.label} className=" relative flex flex-col text-left">
                <div className="relative flex flex-col max-w-fit">
                  <label htmlFor={el.labelName}>{el.label}</label>
                  <select
                    onChange={onChangeSetState}
                    name={el.labelName}
                    className="w-80 lg:w-60 h-10 pl-2 border rounded focus:outline-none focus:ring focus:border-slate-700 focus:border-none"
                  >
                    <option value="지출">지출</option>
                    <option value="수입">수입</option>
                  </select>
                </div>
              </div>
            );
          }
        })}
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
              isOpenFunction("today", false),
                setFormData({ date: "", type: "지출", amount: 0, place: "" });
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
