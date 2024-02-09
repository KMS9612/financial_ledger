import { IFixedData } from "../../types/fixedTypes/fixedDataType";
import ChartBox from "../chart/resultChart";

interface IPropsResultLarge {
  title: string;
  subText: string;
  editData: any;
  fixedData: IFixedData;
}

export default function ResultBoxLarge(props: IPropsResultLarge) {
  return (
    <div className="w-full h-full border rounded-lg shadow-md p-2">
      <div>
        <ChartBox editData={props.editData} fixedData={props.fixedData} />
      </div>
    </div>
  );
}
