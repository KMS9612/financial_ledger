"use client";
import { useEffect, useState } from "react";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import { IPropsIsOpenModal } from "../src/types/modalTypes/ModalProps";
import TableInfomation from "./tableInfo";
import useCheckLogin from "../functions/checkLogin";
import { useRouter } from "next/navigation";
import api from "../axios/instance";

export default function EditPage() {
  const router = useRouter();
  useCheckLogin(router);
  const [isOpen, setIsOpen] = useState<IPropsIsOpenModal>({
    edit: false,
    today: false,
  });
  const [formData, setFormData] = useState({
    date: "",
    type: "지출",
    amount: 0,
    place: "",
  });
  const [financialData, setFinancialData] = useState([]);

  // 일일등록 모달과 고정비용 모달의 on/off를 조절하는 함수
  const onChangeStateOfModal = (
    modalType: keyof IPropsIsOpenModal,
    changeType: boolean
  ) => {
    let newObject = { ...isOpen };
    for (let i of Object.keys(newObject)) {
      if (i === modalType) {
        newObject[i as keyof IPropsIsOpenModal] = changeType;
      } else {
        newObject[i as keyof IPropsIsOpenModal] = false;
      }
    }
    setIsOpen(newObject);
  };

  const fetchTableData = async () => {
    // const email = JSON.parse(sessionStorage.getItem("email") || "");
    const email = sessionStorage.getItem("email");
    const payload = { email: email };
    console.log(email);
    const response = await api
      .get("/edit/fetchAllFinancial", {
        params: payload,
      })
      .then((res) => {
        setFinancialData(res.data.data.data);
        console.log(res.data.data.data);
      });
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="relative h-full mx-auto flex flex-col pt-20 gap-8 xl:px-20 md:px-5  ">
      <button onClick={fetchTableData}>fetchButton</button>
      <FixPayModal
        isOpenFunction={onChangeStateOfModal}
        isOpenObject={isOpen}
      />
      <TodayPayModal
        isOpenFunction={onChangeStateOfModal}
        isOpenObject={isOpen}
        setFormData={setFormData}
        formData={formData}
      />
      <div className="flex justify-between items-end gap-20">
        <button
          onClick={() => onChangeStateOfModal("edit", !isOpen.edit)}
          className="w-80 h-10 flex justify-center items-center border-2 border-slate-600 rounded text-slate-600 font-bold transition ease-in-out hover:-translate-y-1"
        >
          고정 비용 설정
        </button>
        <button
          // onClick={() => setIsOpenToday((prev) => !prev)}
          onClick={() => onChangeStateOfModal("today", !isOpen.today)}
          className="w-80 h-10 flex justify-center items-center border-2 border-slate-600 rounded text-slate-600 font-bold transition ease-in-out hover:-translate-y-1"
        >
          오늘 입/출 등록
        </button>
      </div>
      <div className="table border rounded-md border-slate-600">
        {/* Table Top */}
        <div className="flex border-b border-slate-600 bg-slate-600 text-white font-bold text-xs xl:text-sm sm:text-xs ">
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            일시
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            종류
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            사용처
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            금액
          </div>
          <div className="w-1/3 h-6 border-r flex justify-center items-center">
            총액
          </div>
          <div className="w-1/6 h-6 border-r flex justify-center items-center">
            조작
          </div>
        </div>
        {/* Table Infomation */}
        {financialData.map((el) => (
          <TableInfomation financialData={el} />
        ))}
      </div>
    </div>
  );
}
