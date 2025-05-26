import { findUserByEmail } from "../repositories/user.repository";
import { validatePassword } from "@/app/api/common/services/password.service";
import { User, ApiResponse } from "@/app/api/common/types/user.types";

export async function validateUser(
  email: string,
  password: string
): Promise<ApiResponse<{ user: Omit<User, "password"> }>> {
  // 입력받은 Email이 DB에 존재하는지(가입되어 있는지)확인
  const user = await findUserByEmail(email);

  if (!user) {
    return {
      success: false,
      errorMessage: "이메일 또는 비밀번호가 올바르지 않습니다.",
      status: 401,
    };
  }

  // 이메일을 찾았다면 이메일에 해당하는 해쉬비밀번호가 일치하는지 확인
  const isValidPassword = await validatePassword(password, user.password);

  if (!isValidPassword) {
    return {
      success: false,
      errorMessage: "이메일 또는 비밀번호가 올바르지 않습니다.",
      status: 401,
    };
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    success: true,
    data: {
      user: userWithoutPassword,
    },
    status: 200,
  };
}
