import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "financial_ledger",
  password: "rlaalstmd12!",
});

export { pool };
