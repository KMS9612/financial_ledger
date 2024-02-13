import CalculateForChart from "@/app/functions/calculateForChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IFixedData } from "../../types/fixedTypes/fixedDataType";

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
  Legend
);
export default function ChartBox(props: IPropsChart) {
  const { plus, minus } = CalculateForChart(props.editData, props.fixedData);
  const data = {
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
        text: "월 고정수입 기준 지출/수입 그래프",
      },
    },
  };
  return (
    <div className="w-full h-full border rounded-lg shadow-md p-2 overflow-auto">
      <Bar
        className="min-w-[440px] w-full h-screen"
        data={data}
        options={options}
      ></Bar>
    </div>
  );
}
