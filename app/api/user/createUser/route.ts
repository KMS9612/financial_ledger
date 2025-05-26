import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./services/createUser.service";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    const result = await createUser({ email, password, name });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errorMessage: result.errorMessage,
        },
        { status: result.status }
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("사용자 생성 중 오류 발생:", error);
    return NextResponse.json(
      {
        success: false,
        errorMessage: "사용자 생성 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
