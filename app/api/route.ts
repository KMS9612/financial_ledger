import { pool } from "@/app/src/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    pool.query("INSERT INTO financial (id, name, age) VALUE (this, is, test)");

    console.log(req, res);
    return NextResponse.json({ message: "success" });
  } catch (err) {
    console.log(req, res);
    console.error(err);
    return NextResponse.json({ message: "error", err: err });
  }
}
