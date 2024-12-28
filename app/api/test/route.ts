import { pool } from "@/app/src/lib/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const insertDataQuery = `
    INSERT INTO 
    user_table (name, age) 
    VALUES ('is', 1)`;

    await pool.query(insertDataQuery);

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: "ERROR", err: err });
  }
}
