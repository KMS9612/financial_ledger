import { pool } from "@/app/src/lib/db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ApiResponse } from "../../common/utils/apiResponse";

export const createFixedTable = async () => {
  try {
    // 고정 수입/지출 테이블 생성
    const createFixedDataTableQuery = `
        CREATE TABLE IF NOT EXISTS fixed_data (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255) NOT NULL,
            income DECIMAL(10,2) NOT NULL,
            saving DECIMAL(10,2) NOT NULL,
            fixed DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (email) REFERENCES users(email),
            INDEX idx_email (email) 
            );
            `;

    const [result] = await pool.query(createFixedDataTableQuery);
    return { result };
  } catch (err) {
    console.log(
      "FixedData의 Table을 DB에 생성하던 중 오류가 발생했습니다.",
      err
    );
    throw new Error(
      "FixedData의 Table을 DB에 생성하던 중 오류가 발생했습니다."
    );
  }
};

interface FixedDataTypes {
  id?: number;
  email: string;
  income: number;
  saving: number;
  fixed: number;
}

export const createFixedData = async (
  fixedData: FixedDataTypes
): Promise<ResultSetHeader> => {
  try {
    const createFixedDataQuery = `
        INSERT INTO fixed_data (email, income, saving, fixed)
        VALUES (?,?,?,?)
        `;

    const { email, income, saving, fixed } = fixedData;
    const [result] = await pool.query<ResultSetHeader>(createFixedDataQuery, [
      email,
      income,
      saving,
      fixed,
    ]);

    return result;
  } catch (err) {
    console.log(
      "FixedData의 데이터를 table에 입력하던 중 오류가 발생했습니다.",
      err
    );
    throw new Error(
      "FixedData의 데이터를 table에 입력하던 중 오류가 발생했습니다."
    );
  }
};

export const getFixedData = async (
  email: string
): Promise<FixedDataTypes[]> => {
  try {
    const getFixedDataQuery = `
      SELECT email, income,saving,fixed FROM fixed_data WHERE email = ?;
    `;

    const [rows] = await pool.query(getFixedDataQuery, [email]);

    return rows as FixedDataTypes[];
  } catch (err) {
    console.log("FixedData를 DB에서 불러오던 중 오류가 발생했습니다.", err);
    throw new Error("FixedData를 DB에서 불러오던 중 오류가 발생했습니다.");
  }
};

export const updateFixedData = async (
  fixedData: Partial<FixedDataTypes>
): Promise<boolean> => {
  try {
    const { email, ...updateData } = fixedData;

    const updateFixedDataQuery = `
    UPDATE fixed_data 
    SET ? 
    WHERE email = ?
    `;

    const [result] = await pool.query<ResultSetHeader>(updateFixedDataQuery, [
      updateData,
      email,
    ]);

    return true;
  } catch (err) {
    return false;
  }
};
