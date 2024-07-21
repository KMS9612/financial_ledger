"use client";
import { useRouter } from "next/navigation";
import TableInfomation from "../../src/components/pages/edit/tableInfo";
import FixedDataBox from "@/app/src/components/commons/boxes/fixedDataBox";
import EditItemsDetailModal from "@/app/src/components/modals/editItemsDetailModal";
import { useSetRecoilState } from "recoil";
import { tableDataState } from "@/app/src/recoil/store/tableData";
import { useEffect } from "react";

export default function MonthDetail({
  params,
}: {
  params: { monthDetail: string };
}) {
  const router = useRouter();
  const propsData = params.monthDetail.replace(".", "/");
  const [year, month] = propsData.split("/");

  // result에서 진입 할 시 첫 진입이 아니라면 이전 값이 남아있어 몇초간 이전 테이블데이터가 보여지는 문제를 막기위해 작성
  const setTableData = useSetRecoilState(tableDataState);
  useEffect(() => {
    setTableData([]);
  });

  return (
    <div className="w-full h-full animate-fade animate-once dark:text-white">
      <EditItemsDetailModal />
      {/* Top Infomation */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-10 xl:gap-0 px-10 py-4">
        <div className="flex gap-2 justify-center items-center">
          <button
            onClick={() => router.back()}
            className="text-center font-bold border-2 rounded-lg p-1 text-slate-500 border-slate-500 dark:text-white dark:border-white hover:bg-slate-500 dark:hover:bg-white hover:text-white dark:hover:text-stone-500 hover:border-white transition-all duration-300"
          >
            {/* <Image
              src={"/arrowLeft.png"}
              width={20}
              height={20}
              alt={"뒤로가기 버튼 이미지"}
            ></Image> */}
            Back
          </button>
          <h2 className="font-bold text-xl text-slate-700 dark:text-white">
            {`${year} - ${month}월의 지출 / 수입 정보`}
          </h2>
        </div>
        <FixedDataBox />
      </div>
      {/* <Table Infomation /> */}
      <TableInfomation />
    </div>
  );
}
