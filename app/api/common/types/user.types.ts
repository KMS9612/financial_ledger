export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export type ApiResponse<T = void> =
  | { success: true; data?: T; status: number }
  | { success: false; errorMessage: string; status: number };
