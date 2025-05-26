// import { pool } from "@/app/src/lib/db/db";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const data = await req.json();
//     const hashedPw = await pwHashing(data.password);

//     const createUserTable = `
//       CREATE TABLE IF NOT EXISTS user (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       email VARCHAR(255),
//       password_hashed VARCHAR(255)
//       )
//     `;
//     const insertDataQuery = `
//     INSERT INTO
//     user (email, password_hashed)
//     VALUES ('${data.email}', '${hashedPw}')
//     `;

//     await pool.query(createUserTable);
//     await pool.query(insertDataQuery);

//     return NextResponse.json({
//       message: "Create User Success",
//       data: data,
//     });
//   } catch (err) {
//     return NextResponse.json({ message: "ERROR", err: err });
//   }
// }
