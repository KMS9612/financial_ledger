import { createUserTable } from "@/app/api/user/createUser/repositories/createUser.repository";
import { createFixedTable } from "../fixed/repositories/fixed.repository";

// 데이터 베이스 초기화시 (ex:PromotionServer로 이동) 수동작동시킬 함수
async function initializeDatabase() {
  try {
    console.log("users table생성시작");
    await createUserTable();

    console.log("fixed_data table생성시작");
    await createFixedTable();

    console.log("데이터베이스 초기화 완료");
  } catch (error) {
    console.error("데이터베이스 초기화 실패:", error);
  }
}

initializeDatabase();
