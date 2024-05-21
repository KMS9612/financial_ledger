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

// Object(fixedData)를 받아 값이 존재하는지 확인하는 타입가드
// Return값은 boolean이 아니라 해당 값이 IFixedData라는 걸 확신한다는 내용을 타입스크립트 컴파일러에 보내주게 된다.
export function FixedDataTypeGuard(object: any): object is IFixedData {
  const requiredProperties = ["_id", "email", "income", "saving", "fixed"];

  return requiredProperties.every((property) => property in object);
}
