import { IEditDataFull } from "@/app/src/types/editTypes/editTypes";
import Cookie from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useChangeStateOfModals } from "../../lib/hooks/useChangeStateOfModals";
import { clickedEditDetail } from "../../recoil/store/clickedEditDetail";
import { ITableData, isITableData } from "../../types/editTypes/tableType";
import { useEffect, useState } from "react";
import CircleLoading from "../loading/circleLoading";
import api from "@/app/src/service/instance";
import { usePathname } from "next/navigation";
import { getMonthEdit } from "../../service/getMonthEdit";
import { tableDataState } from "../../recoil/store/tableData";
import { deleteOneEdit } from "../../service/deleteOneEdit";

export default function EditItemsDetailModal() {
  const pathName = usePathname();
  const { isOpen, changeModalState } = useChangeStateOfModals();
  const editDetailData = useRecoilValue<ITableData | {}>(clickedEditDetail);
  const [isDataValid, setIsDataValid] = useState(false);
  const setTableData = useSetRecoilState(tableDataState);

  useEffect(() => {
    const valid = isITableData(editDetailData);
    setIsDataValid(valid);
  }, [editDetailData]);

  const onClickRemoveEditData = async () => {
    try {
      const email =
        sessionStorage.getItem("email") || Cookie.get("email") || "";
      // Month객체와 Day객체의 아이디를 구하는 부분
      const monthData = JSON.parse(sessionStorage.getItem("monthData") || "");
      const targetMonth = pathName.split("/")[2].replace(".", "/");
      const monthID: string =
        monthData.filter((el: IEditDataFull) => el.month === targetMonth)[0]
          ._id || "";
      const dayID = (editDetailData as ITableData)._id;

      const body = { email, monthID, dayID };
      await deleteOneEdit(body);
      changeModalState("editDetail", false);
      setTableData([]);
      const res = await getMonthEdit(targetMonth);
      setTableData(res);
    } catch (err) {
      alert("에러가 발생했습니다.");
      console.log(err);
    }
  };
  return (
    <div
      className={`${
        isOpen.editDetail
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      } absolute w-full h-full flex justify-center items-center transition-opacity duration-300 ease-in-out`}
    >
      <div
        onClick={() => changeModalState("editDetail", false)}
        className="absolute w-full h-full bg-gray-500/50"
      ></div>
      {isDataValid ? (
        <div className="absolute flex justify-center items-center min-w-[300px] w-2/4 h-[500px] bg-white shadow-xl rounded-lg p-2">
          {/* <h2>{(editDetailData as ITableData).day} 상세 정보</h2>
          <div>{(editDetailData as ITableData).value.amount}</div>
          <div>{(editDetailData as ITableData).value.financial_type}</div>
          <div>{(editDetailData as ITableData).value.place}</div> */}
          <p className="font-bold text-2xl text-gray-500">개발 중 입니다.</p>
          <button onClick={onClickRemoveEditData} className="border-2">
            삭제
          </button>
        </div>
      ) : (
        <CircleLoading />
      )}
    </div>
  );
}
