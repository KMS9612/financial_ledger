export interface IEditDataFull {
  month: string;
  date: [
    {
      day: string;
      value: {
        financial_type: string;
        amount: number;
        place: string;
      };
    }
  ];
}

export interface IPropsFetchedData {
  month: string;
  date: [IEditDataDate];
  _id: string;
}

export interface IEditDataDate {
  day: string;
  value: IEditDataValue;
}

export interface IEditDataValue {
  financial_type: string;
  amount: number;
  place: string;
}
