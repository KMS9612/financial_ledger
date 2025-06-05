import { pool } from "@/app/src/lib/db/db";
import { User } from "@/app/api/common/types/user.types";
import { RowDataPacket } from "mysql2";

export async function findUserByEmail(email: string): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  if (rows.length === 0) return null;

  const user = rows[0];
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    name: user.name,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
