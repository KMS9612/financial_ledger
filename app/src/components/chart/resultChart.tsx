import CalculateForChart from "@/app/src/lib/calculates/calculateForChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";
import CalculateForDoughnut from "@/app/src/lib/calculates/calculateForDoughnut";
import { useRecoilValue } from "recoil";
import { showMonthDataState } from "../../recoil/store/showMonthData";

interface IPropsChart {
  editData: any;
  fixedData: IFixedData;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement
);
export default function ChartBox(props: IPropsChart) {
  const { plus, minus } = CalculateForChart(props.editData, props.fixedData);
  const { fixed, income, saving } = props.fixedData;
  const showMonthData = useRecoilValue(showMonthDataState);

  // yyyy/mm 포맷으로 현재 달을 찾아 도넛형 그래프에 필요한 일일등록 정보를 반환하는 함수
  const { monthMinusData, monthPlusData } = CalculateForDoughnut(
    props.editData
  );
  // 월간 데이터 (고정 수입, 고정지출, 이번 월 일일 수익, 이번 월 일일 지출) / (백분율 X)
  const monthData = {
    labels: ["고정 수입", "고정 지출", "이번 달 수익", "이번 달 지출", "저축"],
    datasets: [
      {
        label: "원 (Won)",
        data: [income, fixed, monthPlusData, monthMinusData, saving],
        backgroundColor: [
          "#B3D83F",
          "#FF4823",
          "#CFEB66",
          "#FF8259",
          "#84A9FF",
        ],
      },
    ],
  };
  const monthOption = {
    responsive: true,
    Animation: true,
    plugins: {
      title: {
        display: true,
        fullSize: true,
        text: "이번 달 데이터",
      },
    },
  };
  // 연간 데이터 (월별 총 수입, 총 지출의 퍼센테이지)
  const yearData = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    datasets: [
      {
        label: "연간 월 지출(%)",
        data: minus,
        backgroundColor: "rgba(224, 61, 61, 0.863)",
        borderColor: "rgba(75,192,192,1)",
        borderRadius: 5,
        borderWidth: 1,
      },
      {
        label: "연간 월 수입(%)",
        data: plus,
        backgroundColor: "rgba(119, 203, 150, 0.838)",
        borderColor: "rgba(75,192,192,1)",
        borderRadius: 5,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        fullSize: true,
        text: "연간 지출/수입 그래프",
      },
    },
  };
  return (
    <div className="w-full xl:h-full h-96 flex justify-center items-center border rounded-lg shadow-md p-2 overflow-auto">
      {showMonthData ? (
        <Doughnut data={monthData} options={monthOption}></Doughnut>
      ) : (
        <Bar
          className="min-w-[380px] w-full h-screen"
          data={yearData}
          options={options}
        ></Bar>
      )}
    </div>
  );
}
