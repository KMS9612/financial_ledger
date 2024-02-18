"use client";

import { useRouter } from "next/navigation";
import TableInfomation from "../tableInfo";
import Image from "next/image";
import { useEffect, useState } from "react";
import FixedDataBox from "@/app/src/components/box/fixedDataBox";

export default function MonthDetail({
  params,
}: {
  params: { monthDetail: any };
}) {
  const router = useRouter();
  const propsData = params.monthDetail.replace(".", "/");
  const [year, month] = propsData.split("/");
  const [tableData, setTableData] = useState<Array<any>>([]);

  useEffect(() => {
    // sessionStorage에 저장한 monthData에서 클릭된 년/월의 일별 데이터를 가져오기
    const monthData = JSON.parse(
      sessionStorage.getItem("monthData") || ""
    ).filter((el: any) => el.month === propsData)[0].date;

    // 선택된 달의 일별 데이터 테이블을 정렬
    monthData.sort((a: any, b: any) => {
      const dayA = a.day;
      const dayB = b.day;

      if (dayA > dayB) {
        return 1;
      } else {
        return -1;
      }
    });
    setTableData(monthData);
  });

  return (
    <div className="w-full h-screen p-4 pt-20 xl:p-20">
      {/* Top Infomation */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-4 gap-10 xl:gap-0">
        <div className="flex gap-2">
          <button onClick={() => router.back()}>
            <Image
              src={"/arrowLeft.png"}
              width={20}
              height={20}
              alt={"뒤로가기 버튼 이미지"}
            ></Image>
          </button>
          <h2 className="font-bold text-xl text-slate-700">
            {`${year} - ${month}월의 지출 / 수입 정보`}
          </h2>
        </div>
        <FixedDataBox />
      </div>
      {/* <Table Infomation /> */}
      <TableInfomation tableData={tableData} />
    </div>
  );
}
