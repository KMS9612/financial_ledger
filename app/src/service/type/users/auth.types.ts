import { RowDataPacket } from "mysql2";

export interface User extends RowDataPacket {
    email: string;
    password_hashed: string; 
}

export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export interface LoginResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}