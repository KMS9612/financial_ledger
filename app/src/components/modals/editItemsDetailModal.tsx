import { useRecoilValue } from "recoil";
import { useChangeStateOfModals } from "../../lib/hooks/useChangeStateOfModals";
import { clickedEditDetail } from "../../recoil/store/clickedEditDetail";
import { ITableData, isITableData } from "../../types/editTypes/tableType";
import { useEffect, useState } from "react";
import CircleLoading from "../loading/circleLoading";

export default function EditItemsDetailModal() {
  const { isOpen, changeModalState } = useChangeStateOfModals();
  const editDetailData = useRecoilValue<ITableData | {}>(clickedEditDetail);
  const [isDataValid, setIsDataValid] = useState(false);

  useEffect(() => {
    const valid = isITableData(editDetailData);
    setIsDataValid(valid);
  }, [editDetailData]);

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
        </div>
      ) : (
        <CircleLoading />
      )}
    </div>
  );
}
