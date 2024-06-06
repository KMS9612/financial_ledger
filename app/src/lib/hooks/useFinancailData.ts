import { useRecoilState } from "recoil";
import {
  editDataState,
  fixedDataState,
} from "../../recoil/store/financialData";
import { useCallback, useEffect } from "react";
import { getFixedData } from "../../service/getFixedData";
import { getAllFinancial } from "../../service/getAllFinancial";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";
import { IEditDataFull } from "../../types/editTypes/editTypes";

function useFinancailData() {
  const [editData, setEditData] = useRecoilState<Array<IEditDataFull> | []>(
    editDataState
  );
  const [fixedData, setFixedData] = useRecoilState<IFixedData | {}>(
    fixedDataState
  );

  const fetchFinancialData = useCallback(async () => {
    // 고정비용 요청하기
    const fixed = await getFixedData();
    setFixedData(fixed);

    // 일일 등록 정보 요청하기
    const edited = await getAllFinancial();
    setEditData(edited);
    sessionStorage.setItem("monthData", JSON.stringify(edited));
  }, [setFixedData, setEditData]);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);
  return { editData, fixedData, refetchData: fetchFinancialData };
}

export default useFinancailData;
