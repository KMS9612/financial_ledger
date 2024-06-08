interface IUnitTypes {
  만: number;
  천: number;
  백: number;
  [key: string]: number;
}

const calculateForUnit = (number: number) => {
  let units: IUnitTypes = {
    억: 100000000,
    만: 10000,
    천: 1000,
    백: 100,
  };
  let result = "";

  Object.keys(units).forEach((unit) => {
    if (number >= units[unit]) {
      // 나누어 떨어지는 몫.
      const quotient = Math.floor(number / units[unit]);
      // 몫이 0보다 크면 결과 문자열에 추가.
      if (quotient > 0) {
        result += `${quotient}${unit}`;
      }
      // 남은 숫자를 계산.
      number %= units[unit];
    }
  });

  return result + "원";
};

export default calculateForUnit;
