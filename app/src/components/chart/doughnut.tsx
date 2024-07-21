import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CalculateForDoughnut from "../../lib/calculates/calculateForDoughnut";
import { useRecoilValue } from "recoil";
import {
  editDataState,
  fixedDataState,
} from "../../recoil/store/financialData";
import { FixedDataTypeGuard } from "../../types/fixedTypes/fixedDataType";
import { isDarkState } from "../../recoil/store/isDark";

ChartJS.register(Title, Tooltip, Legend, DoughnutController, ArcElement);
const DoughnutChart = () => {
  const fixedData = useRecoilValue(fixedDataState);
  const editData = useRecoilValue(editDataState);
  const isDark = useRecoilValue(isDarkState);
  ChartJS.defaults.color = `${isDark ? "white" : "black"}`;
  if (!FixedDataTypeGuard(fixedData)) return;

  const { fixed, income, saving } = fixedData;

  // yyyy/mm 포맷으로 현재 달을 찾아 도넛형 그래프에 필요한 일일등록 정보를 반환하는 함수
  const { monthMinusData, monthPlusData } = CalculateForDoughnut(editData);
  let dataArr = [income, fixed, monthPlusData, monthMinusData, saving];

  // 월간 데이터 (고정 수입, 고정지출, 이번 월 일일 수익, 이번 월 일일 지출) / (백분율 X)
  const monthData = {
    labels: ["고정 수입", "고정 지출", "이번 달 수익", "이번 달 지출", "저축"],
    datasets: [
      {
        label: "원 (Won)",
        data: dataArr,
        backgroundColor: [
          "#B3D83F",
          "#FF4823",
          "#CFEB66",
          "#FF8259",
          "#84A9FF",
        ],
        hoverOffset: 10,
        spacing: 2,
      },
    ],
  };

  const monthOption = {
    responsive: true,
    plugins: {
      legned: {
        position: "top",
        labels: {
          color: `${isDark ? "#ffffff" : ""}`,
        },
      },
      title: {
        display: true,
        fullSize: true,
        text: "월 간 데이터",
      },
    },
  };

  return <Doughnut data={monthData} options={monthOption}></Doughnut>;
};

export default DoughnutChart;
