import { NextRequest, NextResponse } from "next/server";
import { createUser } from "./services/createUser.service";
import { errorResponse, successResponse } from "../../common/utils/apiResponse";
import { CreateUserResponseType } from "./types/reponse.types";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    const result = await createUser({ email, password, name });

    if (!result.success) {
      return NextResponse.json(
        errorResponse(result.errorMessage, result.status)
      );
    }

    return NextResponse.json(
      successResponse<CreateUserResponseType>(
        { user: result.data.user },
        result.status
      )
    );
  } catch (error) {
    console.error("사용자 생성 중 오류 발생:/user/createUser/route", error);
    return NextResponse.json(
      // {
      //   success: false,
      //   errorMessage: "사용자 생성 중 오류가 발생했습니다.",
      // },
      // { status: 500 }
      errorResponse("사용자 생성 중 오류가 발생했습니다.", 500)
    );
  }
}
