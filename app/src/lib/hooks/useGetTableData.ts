import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getMonthEdit } from "../../service/getMonthEdit";
import { useRecoilState } from "recoil";
import { tableDataState } from "../../recoil/store/tableData";

export const useGetTableData = () => {
  const [tableData, setTableData] = useRecoilState(tableDataState);
  const pathName = usePathname();
  useEffect(() => {
    const getTableData = async () => {
      const yearMonth = pathName.split("/")[2].replace(".", "/");
      const res = await getMonthEdit(yearMonth);
      // 선택된 달의 일별 데이터 테이블을 정렬
      res.sort((a: any, b: any) => {
        const dayA = a.day;
        const dayB = b.day;

        if (dayA > dayB) {
          return 1;
        } else {
          return -1;
        }
      });
      setTableData(res);
    };
    getTableData();
  }, [pathName]);

  return { tableData };
};
