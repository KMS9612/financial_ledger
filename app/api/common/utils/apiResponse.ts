export type ApiResponse<T = void> =
  | { success: true; data?: T; status: number }
  | { success: false; errorMessage: string; status: number };

/** (data: T, status: number/default:200) return :T*/
export const successResponse = <T>(
  data: T,
  status: number = 200
): ApiResponse<T> => {
  return {
    success: true,
    data,
    status,
  };
};

/** (errorMessage: string, status: number/default:500) return:void*/
export const errorResponse = (
  errorMessage: string,
  status: number = 500
): ApiResponse<void> => {
  return { success: false, errorMessage, status };
};
