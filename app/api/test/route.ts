import { pool } from "@/app/src/lib/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS financial_ledger (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      age INT NOT NULL
      );
    `;

    const insertDataQuery = `
    INSERT INTO 
    financial (name, age) 
    VALUES ('is', 1)`;
    await pool.query(createTableQuery);

    await pool.query(insertDataQuery);

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err: err });
  }
}
