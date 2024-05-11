import { useRecoilState } from "recoil";
import {
  editDataState,
  fixedDataState,
} from "../../recoil/store/financialData";
import { useEffect } from "react";
import { getFixedData } from "../../service/getFixedData";
import { getAllFinancial } from "../../service/getAllFinancial";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";

function useFinancailData() {
  const [editData, setEditData] = useRecoilState<any>(editDataState);
  const [fixedData, setFixedData] = useRecoilState<IFixedData | {}>(
    fixedDataState
  );

  useEffect(() => {
    const fetchFinancialData = async () => {
      const email = sessionStorage.getItem("email");
      const params = { email };
      // 고정비용 요청하기
      const fixed = await getFixedData(params);
      setFixedData(fixed);

      // 일일 등록 정보 요청하기
      const edited = await getAllFinancial();
      setEditData(edited);
      sessionStorage.setItem("monthData", JSON.stringify(edited));
    };
    fetchFinancialData();
  }, [setFixedData, setEditData]);
  return { editData, fixedData };
}

export default useFinancailData;
