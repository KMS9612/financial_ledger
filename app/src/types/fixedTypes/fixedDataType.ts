export interface IFixedData {
  _id: string;
  email: string;
  income: number;
  saving: number;
  fixed: number;
}

// PostFixedData의 매개변수로 들어가는 Input값을 객체화 한 fixedData
export interface IParamsFixedData {
  income: number;
  saving: number;
  fixed: number;
}
