"use client";
import { useRouter } from "next/navigation";
import TableInfomation from "../../src/components/pages/edit/tableInfo";
import Image from "next/image";
import FixedDataBox from "@/app/src/components/commons/boxes/fixedDataBox";
import EditItemsDetailModal from "@/app/src/components/modals/editItemsDetailModal";

export default function MonthDetail({
  params,
}: {
  params: { monthDetail: any };
}) {
  const router = useRouter();
  const propsData = params.monthDetail.replace(".", "/");
  const [year, month] = propsData.split("/");

  return (
    <div className="w-full h-screen">
      <EditItemsDetailModal />
      {/* Top Infomation */}
      <div className="flex flex-col xl:flex-row justify-between items-center mb-4 gap-10 xl:gap-0 px-10 py-4">
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
      <TableInfomation />
    </div>
  );
}
