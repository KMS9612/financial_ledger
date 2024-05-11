import { IFixedData } from "../../types/fixedTypes/fixedDataType";

// Object(fixedData)를 받아 값이 존재하는지 확인하는 타입가드
// Return값은 boolean이 아니라 해당 값이 IFixedData라는 걸 확신한다는 내용을 타입스크립트 컴파일러에 보내주게 된다.
export function FixedDataTypeGuard(object: any): object is IFixedData {
  const requiredProperties = ["_id", "email", "income", "saving", "fixed"];

  console.log(object);
  console.log(requiredProperties.every((property) => property in object));
  return requiredProperties.every((property) => property in object);
}
