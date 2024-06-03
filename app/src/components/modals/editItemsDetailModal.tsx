import { IEditDataFull } from "@/app/src/types/editTypes/editTypes";
import Cookie from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useChangeStateOfModals } from "../../lib/hooks/useChangeStateOfModals";
import { clickedEditDetail } from "../../recoil/store/clickedEditDetail";
import { ITableData, isITableData } from "../../types/editTypes/tableType";
import { useEffect, useState } from "react";
import CircleLoading from "../loading/circleLoading";
import { usePathname, useRouter } from "next/navigation";
import { getMonthEdit } from "../../service/getMonthEdit";
import { tableDataState } from "../../recoil/store/tableData";
import { deleteOneEdit } from "../../service/deleteOneEdit";
import DeleteBtn from "../commons/buttons/deleteBtn";

export default function EditItemsDetailModal() {
  const router = useRouter();
  const pathName = usePathname();
  const { isOpen, changeModalState } = useChangeStateOfModals();
  const editDetailData = useRecoilValue<ITableData | {}>(clickedEditDetail);
  const [isDataValid, setIsDataValid] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const setTableData = useSetRecoilState(tableDataState);

  useEffect(() => {
    const valid = isITableData(editDetailData);
    setIsDataValid(valid);
  }, [editDetailData]);

  const onClickRemoveEditData = async () => {
    try {
      setIsDeleteLoading(true);
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
      if (res.length === 0) {
        alert(targetMonth + "의 데이터가 모두 삭제되었습니다.");
        router.push("/edit");
      }
      setTableData(res);
      setIsDeleteLoading(false);
    } catch (err) {
      alert("에러가 발생했습니다.");
      changeModalState("editDetail", false);
      console.log(err);
      setIsDeleteLoading(false);
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
        <div className="absolute flex flex-col justify-between items-center min-w-[300px] w-2/6 h-4/5 bg-white shadow-xl rounded-lg p-10">
          {/* Head */}
          <div className="w-full">
            <h2 className="font-bold text-2xl text-slate-500">
              {(editDetailData as ITableData).day}일 상세 정보
            </h2>
          </div>
          {/* Infomation(Body) */}
          <div className="w-full flex flex-col gap-10 font-semibold">
            <div className="w-full flex justify-between items-center border-b-2">
              <span className="font-bold text-xl text-slate-400">사용처</span>
              <span>{(editDetailData as ITableData).value.place}</span>
            </div>
            <div className="w-full flex justify-between items-center border-b-2">
              <span className="font-bold text-xl text-slate-400">종류</span>
              <span>{(editDetailData as ITableData).value.financial_type}</span>
            </div>
            <div className="w-full flex justify-between items-center border-b-2">
              <span className="font-bold text-xl text-slate-400">금액</span>
              <span>{(editDetailData as ITableData).value.amount}원</span>
            </div>
          </div>
          {/* btn Wrap */}
          <div className="w-full h-12">
            <DeleteBtn
              isLoading={isDeleteLoading}
              btnText="삭제"
              type="button"
              onClickEvent={onClickRemoveEditData}
            />
          </div>
        </div>
      ) : (
        <CircleLoading />
      )}
    </div>
  );
}
