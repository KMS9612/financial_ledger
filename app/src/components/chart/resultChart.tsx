import CalculateForChart from "@/app/functions/calculateForChart";
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

interface IPropsChart {
  editData: any;
  fixedData: IFixedData;
  showMonthData: boolean;
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
  // const { fixIncome, fixOutcome, monthIncome, monthOutcome } = ;

  console.log("fixed", props.fixedData);
  // 월간 데이터 (고정 수입, 고정지출, 이번 월 일일 수익, 이번 월 일일 지출)
  const monthData = {
    labels: ["고정 수입", "고정 지출", "이번 달 수익", "이번 달 지출"],
    datasets: [
      {
        label: "원 (Won)",
        data: [2000000, 1500000, 10000, 13000],
        backgroundColor: ["#9dda7c", "#da7171", "#bcf5b6", "#ff8375"],
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
      {props.showMonthData ? (
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
