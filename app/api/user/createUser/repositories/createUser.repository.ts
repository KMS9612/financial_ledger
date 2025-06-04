import { pool } from "@/app/src/lib/db/db";
import { User } from "@/app/api/common/types/user.types";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export async function createUserTable() {
  try {
    const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`;

    await pool.query(createUserTable);
  } catch (error) {
    console.error("테이블 생성 중 오류:", error);
    throw error;
  }
}

export async function createUserInDb(user: Omit<User, "id">) {
  try {
    await createUserTable();

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO users (email, password, name) VALUES (?, ?, ?)",
      [user.email, user.password, user.name]
    );
    // 생성된 id 반환
    const insertId = result.insertId;
    return { ...user, id: insertId };
  } catch (error) {
    console.error("사용자 생성 중 오류:", error);
    // 생성 오류시 null을 보내 createUserService내부 validate에서 걸러짐
    // DB의 오류코드를 받아 좀 더 상세한 오류를 보내는 방법으로 변환이 필요해보임
    return null;
  }
}
