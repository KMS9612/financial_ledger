export interface IPropsFetchedData {
  month: string;
  date: [
    {
      day: string;
      value: { financial_type: string; amount: number; place: string };
    }
  ];
}
