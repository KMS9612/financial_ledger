"use client";
import { useEffect, useState } from "react";
import TodayPayModal from "../src/components/modals/todayPayModal";
import FixPayModal from "../src/components/modals/fixPayModal";
import { IPropsIsOpenModal } from "../src/types/modalTypes/ModalProps";
import TableInfomation from "./tableInfo";
import useCheckLogin from "../functions/checkLogin";
import { useRouter } from "next/navigation";
import api from "../axios/instance";
import MonthList from "./monthList";
import { IPropsFetchedData } from "../src/types/editTypes/editTypes";
import { ITableData } from "../src/types/editTypes/tableType";

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
  const [financialData, setFinancialData] = useState<Array<IPropsFetchedData>>(
    []
  );
  const [openTable, setOpenTable] = useState<boolean>(false);
  const [tableData, setTableData] = useState<Array<ITableData>>([]);

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

  // 해당 유저가 등록한 모든 일일 가계부 정보를 불러오는 함수
  const fetchTableData = async () => {
    // const email = JSON.parse(sessionStorage.getItem("email") || "");
    const email = sessionStorage.getItem("email");
    const payload = { email: email };
    await api
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
      <div className="flex justify-between items-center gap-20">
        <div>
          <h2 className="font-bold text-xl text-slate-700">
            지출 / 수입 정보 등록
          </h2>
        </div>
        <div className="flex gap-5">
          <button
            onClick={() => onChangeStateOfModal("edit", !isOpen.edit)}
            className="w-80 h-10 flex justify-center items-center border-2 border-slate-600 rounded text-slate-600 font-bold transition ease-in-out hover:-translate-y-1"
          >
            고정 비용 설정
          </button>
          <button
            onClick={() => onChangeStateOfModal("today", !isOpen.today)}
            className="w-80 h-10 flex justify-center items-center border-2 border-slate-600 rounded text-slate-600 font-bold transition ease-in-out hover:-translate-y-1"
          >
            오늘 입/출 등록
          </button>
        </div>
      </div>
      {/* Table Infomation */}
      <div className="w-full flex gap-10">
        {financialData.map((el: IPropsFetchedData, index) => (
          <MonthList key={el.month + index} el={el} />
        ))}
      </div>
    </div>
  );
}
