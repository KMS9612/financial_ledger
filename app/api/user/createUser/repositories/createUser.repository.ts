import { pool } from "@/app/src/lib/db/db";
import { User } from "@/app/api/common/types/user.types";
import { RowDataPacket } from "mysql2";

export async function createUserTable() {
  try {
    const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
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

export async function createUserInDb(user: User) {
  try {
    await createUserTable();

    await pool.query(
      "INSERT INTO users (id, email, password, name) VALUES (?, ?, ?, ?)",
      [user.id, user.email, user.password, user.name]
    );

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [user.id]
    );

    console.log("DB 생성 결과:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("사용자 생성 중 오류:", error);
    return null;
  }
}
