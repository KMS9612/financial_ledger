import { pool } from "@/app/src/lib/db/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { ApiResponse } from "../../common/utils/apiResponse";

export const createFixedTable = async () => {
  try {
    // 고정 수입/지출 테이블 생성
    const createFixedDataTableQuery = `
        CREATE TABLE IF NOT EXISTS fixed_data (
            id VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            income DECIMAL(10,2) NOT NULL,
            saving DECIMAL(10,2) NOT NULL,
            fixed DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            INDEX idx_user_id (user_id) 
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
  id: string;
  user_id: string;
  income: number;
  saving: number;
  fixed: number;
}

export const createFixedData = async (
  fixedData: FixedDataTypes
): Promise<ResultSetHeader> => {
  try {
    const createFixedDataQuery = `
        INSERT INTO fixed_data (id, user_id, income, saving, fixed)
        VALUES (?,?,?,?,?)
        `;

    const { id, user_id, income, saving, fixed } = fixedData;
    const [result] = await pool.query<ResultSetHeader>(createFixedDataQuery, [
      id,
      user_id,
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

export const getFixedData = async () => {
  try {
  } catch (err) {
    console.log("FixedData를 DB에서 불러오던 중 오류가 발생했습니다.", err);
    throw new Error("FixedData를 DB에서 불러오던 중 오류가 발생했습니다.");
  }
};

export const updateFixedData = async (
  id: string,
  fixedData: Partial<FixedDataTypes>
) => {
  const updateFixedDataQuery = `
    UPDATE fixed_data 
    SET ? 
    WHERE id = ?
  `;

  const [result] = await pool.query<ResultSetHeader>(updateFixedDataQuery, [
    fixedData,
    id,
  ]);
  return { result };
};

// 삭제 기능
export const deleteFixedData = async (id: string) => {
  const deleteFixedDataQuery = `
    DELETE FROM fixed_data 
    WHERE id = ?
  `;

  const [result] = await pool.query<ResultSetHeader>(deleteFixedDataQuery, [
    id,
  ]);
  return { result };
};
