export interface ITableData {
  day: string;
  value: {
    amount: number;
    financial_type: string;
    place: string;
  };
  id: string;
}

export function isITableData(data: any): data is ITableData {
  return (
    typeof data === "object" &&
    data !== null &&
    "day" in data &&
    "value" in data &&
    typeof (data as ITableData).value.amount === "number" &&
    typeof (data as ITableData).value.financial_type === "string" &&
    typeof (data as ITableData).value.place === "string"
  );
}
