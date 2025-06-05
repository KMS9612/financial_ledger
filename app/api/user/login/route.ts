import { NextRequest, NextResponse } from "next/server";
import { generateTokens } from "./services/token.service";
import { validateUser } from "./services/validate.service";
import { errorResponse, successResponse } from "../../common/utils/apiResponse";
import { LoginResponseData } from "./types/response.types";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const validationResult = await validateUser(email, password);

    // validation실패
    if (!validationResult.success) {
      return NextResponse.json(
        errorResponse(validationResult.errorMessage, validationResult.status)
      );
    }

    const { data } = validationResult;

    // validation 후 이메일 없을 경우
    if (!data) {
      return NextResponse.json(
        errorResponse(
          "사용자 데이터를 찾을 수 없습니다.",
          validationResult.status
        )
      );
    }

    // --- login 프로세스 모두 성공 시 response ---
    // 토큰 생성
    const tokens = generateTokens(data.user.email);

    return NextResponse.json(
      successResponse<LoginResponseData>(
        { ...tokens, user: data.user },
        validationResult.status
      )
    );
  } catch (error) {
    return NextResponse.json(
      errorResponse("로그인 처리 중 오류가 발생했습니다.", 500)
    );
  }
}
