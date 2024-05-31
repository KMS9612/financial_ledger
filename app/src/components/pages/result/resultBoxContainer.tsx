import { IPropsResultBoxContainer } from "@/app/src/types/resultlTypes/resultBoxContainer";
import CalculateData from "@/app/src/lib/calculates/calculateData";
import ResultFixDataBox from "../../commons/boxes/resultFixDataBox";
import ResultTodayDataBox from "../../commons/boxes/resultTodayDataBox";

export default function ResultBoxContainer(props: IPropsResultBoxContainer) {
  // 요청한 일일 등록 정보 합산
  const { monthPlus, monthMinus, leftMoney } = CalculateData(
    props.editData,
    props.fixedData
  );

  // 데이터 표시하는 박스의 정보 집합
  const dataSet = [
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
      <ResultFixDataBox />
      {dataSet.map((el, index) => (
        <ResultTodayDataBox key={el.title + el.subText} el={el} />
      ))}
    </div>
  );
}
