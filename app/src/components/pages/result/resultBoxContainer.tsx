import { IPropsResultBoxContainer } from "@/app/src/types/resultlTypes/resultBoxContainer";
import ResultBoxSmall from "../../commons/boxes/resultBoxSm";
import CalculateData from "@/app/src/lib/calculates/calculateData";
import { useRouter } from "next/navigation";

export default function ResultBoxContainer(props: IPropsResultBoxContainer) {
  const router = useRouter();
  // 요청한 일일 등록 정보 합산
  const { monthPlus, monthMinus, leftMoney } = CalculateData(
    props.editData,
    props.fixedData
  );

  // 데이터 표시하는 박스의 정보 집합
  const dataSet = [
    {
      title: "고정비용",
      subText: "사용자가 설정한 고정지출금, 고정수익금, 저금에 대한 액수",
      data: props.fixedData,
    },
    {
      title: "이번 달 총 수입",
      subText: "이번 달 고정수입과 일일수입을 모두 합친 액수",
      data: monthPlus,
    },
    {
      title: "이번 달 총 지출",
      subText: "이번 달의 고정지출과 일일지출을 모두 합친 액수",
      data: monthMinus,
    },
    {
      title: "사용 가능 금액",
      subText: "고정비용, 일일지출을 모두 합산해서 현재 사용가능 한 액수",
      data: leftMoney,
    },
  ];

  return (
    <div className="w-full xl:w-1/4 flex flex-row flex-wrap xl:flex-col gap-4">
      {/* 데이터 표시 박스 */}
      {dataSet.map((el, index) => (
        <ResultBoxSmall
          key={el.title + index}
          title={el.title}
          subText={el.subText}
          data={el.data}
        />
      ))}
      <button
        onClick={() => router.push("/edit")}
        className="w-full xl:w-full h-24 border shadow-md bg-slate-600 text-white font-bold text-xl rounded"
      >
        일일 지출/수입 작성하러 가기
      </button>
    </div>
  );
}
