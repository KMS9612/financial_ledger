import { hashPassword } from "@/app/api/common/services/password.service";
import { User } from "@/app/api/common/types/user.types";
import { findUserByEmail } from "../../login/repositories/user.repository";
import {
  createUserInDb,
  createUserTable,
} from "../repositories/createUser.repository";

interface createUserInterface {
  email: string;
  password: string;
  name: string;
}

type CreateUserErrorResult = {
  success: false;
  errorMessage: string;
  status: number;
};
type CreateUserSuccessResult<T> = {
  success: true;
  data: T;
  status: number;
};

type CreateUserResult =
  | CreateUserErrorResult
  | CreateUserSuccessResult<{ user: Omit<User, "password"> }>;

export async function createUser({
  email,
  password,
  name,
}: createUserInterface): Promise<CreateUserResult> {
  try {
    await createUserTable();
    // 이메일 중복 체크
    const existingUser = await findUserByEmail(email);

    // 중복된 이메일이 있는 경우 반환
    if (existingUser) {
      return {
        success: false,
        errorMessage: "이미 사용 중인 이메일입니다.",
        status: 400,
      };
    }

    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // 사용자 생성
    const user = (await createUserInDb({
      email,
      password: hashedPassword,
      name,
    })) as User;

    if (!user) {
      return {
        success: false,
        errorMessage: "사용자 생성에 실패했습니다.",
        status: 500,
      };
    }

    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: {
        user: userWithoutPassword,
      },
      status: 201,
    };
  } catch (error) {
    console.error(
      "사용자 생성 중 오류:",
      error instanceof Error ? error.message : error
    );
    return {
      success: false,
      errorMessage: "사용자 생성 내부로직 작동 중 오류가 발생했습니다.",
      status: 500,
    };
  }
}
