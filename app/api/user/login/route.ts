import { NextRequest, NextResponse } from "next/server";
import { generateTokens } from "./services/token.service";
import { validateUser } from "./services/validate.service";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const validationResult = await validateUser(email, password);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errorMessage: validationResult.errorMessage,
        },
        { status: validationResult.status }
      );
    }

    const { user } = validationResult;
    const tokens = generateTokens(user.id);

    return NextResponse.json(
      {
        success: true,
        data: {
          ...tokens,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그인 처리 중 오류 발생:", error);
    return NextResponse.json(
      {
        success: false,
        errorMessage: "로그인 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
