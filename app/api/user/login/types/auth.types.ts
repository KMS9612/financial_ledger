import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
  email: string;
  password_hashed: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  data?: any;
  errorMessage?: string;
  status: number;
}

export type ValidationResult =
  | { success: true; user: User; status: number }
  | { success: false; errorMessage: string; status: number };
