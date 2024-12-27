import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "financial",
  password: "rlaalstmd12!",
});

export { pool };
