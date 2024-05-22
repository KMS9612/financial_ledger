import api from "@/app/src/service/instance";
import { useEffect, useState } from "react";
import { IFixedData } from "../../../types/fixedTypes/fixedDataType";

export default function FixedDataBox() {
  const [fixedData, setFixedData] = useState<IFixedData>({
    _id: "",
    email: "",
    saving: 0,
    fixed: 0,
    income: 0,
  });

  // 고정지출, 고정수입, 저금 내용 불러온 후 state에 저장
  useEffect(() => {
    const getFixed = async () => {
      const email = sessionStorage.getItem("email");
      const params = { email };
      const resData = await api.get("/fix/fetchFixedData", { params });
      setFixedData(resData.data.fixedData);
    };
    getFixed();
  }, []);
  return (
    <div className="flex flex-row flex-wrap gap-2 items-center">
      <div className="border-2 border-slate-600 font-bold rounded-md h-10 flex justify-center items-center px-10 text-xs lg:text-base min-w-full xl:min-w-[215px]">
        고정수입: {fixedData?.income} 원
      </div>
      <div className="border-2 border-slate-600 font-bold rounded-md h-10 flex justify-center items-center px-10 text-xs lg:text-base min-w-full xl:min-w-[215px]">
        고정지출: {fixedData?.fixed} 원
      </div>
      <div className="border-2 border-slate-600 font-bold rounded-md h-10 flex justify-center items-center px-10 text-xs lg:text-base min-w-full xl:min-w-[215px]">
        저금: {fixedData?.saving} 원
      </div>
    </div>
  );
}
