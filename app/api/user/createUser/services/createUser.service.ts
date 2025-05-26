import { v4 as uuidv4 } from "uuid";

import { hashPassword } from "@/app/api/common/services/password.service";
import { User, ApiResponse } from "@/app/api/common/types/user.types";
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

export async function createUser({
  email,
  password,
  name,
}: createUserInterface) {
  try {
    await createUserTable();
    // 이메일 중복 체크
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return {
        success: false,
        errorMessage: "이미 사용 중인 이메일입니다.",
        status: 400,
      };
    }

    console.log("이메일 검증/유저테이블생성까지 완료");

    // 비밀번호 해싱
    console.log("해시할 비밀번호:", password);
    const hashedPassword = await hashPassword(password);

    console.log("비밀번호 해쉬 완료");

    // 사용자 생성
    const user = await createUserInDb({
      id: uuidv4(),
      email,
      password: hashedPassword,
      name,
    });

    console.log("사용자 생성 완료", user);

    if (!user) {
      return {
        success: false,
        errorMessage: "사용자 생성에 실패했습니다.",
        status: 500,
      };
    }

    const { password: userPassword, ...userWithoutPassword } = user;

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
