import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import CalculateForChart from "../../lib/calculates/calculateForChart";
import { useRecoilValue } from "recoil";
import {
  editDataState,
  fixedDataState,
} from "../../recoil/store/financialData";
import { FixedDataTypeGuard } from "../../types/fixedTypes/fixedDataType";
import { barChartUnitState } from "../../recoil/store/barChartUnit";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BarChart = () => {
  const fixedData = useRecoilValue(fixedDataState);
  const editData = useRecoilValue(editDataState);
  const chartUnit = useRecoilValue(barChartUnitState);
  if (!FixedDataTypeGuard(fixedData)) return;
  const { plus, minus } = CalculateForChart(editData, fixedData);

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
        label: chartUnit === "won" ? "연간 월 지출(원)" : "연간 월 지출(%)",
        data: minus,
        backgroundColor: "rgba(224, 61, 61, 0.863)",
        borderColor: "rgba(75,192,192,1)",
        borderRadius: 5,
        borderWidth: 1,
      },
      {
        label: chartUnit === "won" ? "연간 월 수입(원)" : "연간 월 수입(%)",
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
  return <Bar data={yearData} options={options}></Bar>;
};

export default BarChart;
