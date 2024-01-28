import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { IPropsTodayModal } from "../../types/modalTypes/todayPayModalType";
import api from "@/app/axios/instance";

export default function TodayPayModal({
  isOpenFunction,
  isOpenObject,
  setFormData,
  formData,
  fetchTableData,
}: IPropsTodayModal) {
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

  const onClickSetCurrentDate = (event: MouseEvent<HTMLInputElement>) => {
    if (event.currentTarget.checked) {
      const date = new Date();
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const currentTime = `${year}/${month}/${day} ${hours}:${minutes}`;
      setFormData({ ...formData, ["date"]: currentTime });
    } else {
      setFormData({ ...formData, ["date"]: "" });
    }
  };

  const onChangeSetState = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
  };

  const onClickSendRequest = async () => {
    // 23.12.25 추후 연달아 클릭하는 거 방지하는 기능 필요함
    const email = sessionStorage.getItem("email");
    await api.post("/edit/createEdit", {
      email: email,
      date: formData.date,
      financial_type: formData.type,
      amount: formData.amount,
      place: formData.place,
    });
    isOpenFunction("today", false);
    fetchTableData();
  };

  return (
    <div
      className={`${
        isOpenObject.today
          ? "opacity-100  pointer-events-auto"
          : "opacity-0  pointer-events-none"
      }
      absolute w-screen lg:w-96 h-fit py-10 bg-white border-slate-700 border-2 top-1/2 left-1/2 w-1/5 -translate-x-1/2 -translate-y-1/2 text-center transition ease-in-out rounded z-10`}
    >
      <div className="mb-10 text-lg font-bold">오늘 지출 등록</div>
      <div className="flex flex-col justify-center items-center gap-10">
        {inputObj.map((el) => {
          if (el.type !== "select") {
            return (
              <div key={el.label} className="relative flex flex-col text-left">
                <div className="relative flex flex-col max-w-fit">
                  <label htmlFor={el.labelName}>{el.label}</label>
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
                {el.label === "등록일시" && (
                  <div>
                    <input
                      onClick={onClickSetCurrentDate}
                      type="checkbox"
                      name="currentTimeCheck"
                      id="currentTimeCheck"
                    />
                    <label htmlFor="currentTimeCheck">현재시간으로</label>
                  </div>
                )}
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
            onClick={onClickSendRequest}
            className="w-80 lg:w-60 h-10 border rounded"
          >
            저장
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
