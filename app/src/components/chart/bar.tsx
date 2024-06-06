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
import { chartTargetYearState } from "../../recoil/store/chartYear";
import { useRouter } from "next/navigation";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BarChart = () => {
  const router = useRouter();
  const fixedData = useRecoilValue(fixedDataState);
  const editData = useRecoilValue(editDataState);
  const chartUnit = useRecoilValue(barChartUnitState);
  const targetYear = useRecoilValue(chartTargetYearState);
  if (!FixedDataTypeGuard(fixedData)) return;
  const { plus, minus } = CalculateForChart(editData, fixedData);

  // 연간 데이터 (월별 총 수입, 총 지출의 퍼센테이지)
  const yearData = {
    labels: [
      "01월",
      "02월",
      "03월",
      "04월",
      "05월",
      "06월",
      "07월",
      "08월",
      "09월",
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
    onClick: (evt: any, activeElement: any) => {
      if (activeElement.length !== 0) {
        var firstPoint = activeElement[0];
        const month = yearData.labels[firstPoint.index].split("월")[0];
        const targetDate = targetYear + "." + month;
        router.push("/edit/" + targetDate);
      }
    },
  };
  return <Bar data={yearData} options={options}></Bar>;
};

export default BarChart;
