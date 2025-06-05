import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "../common/utils/apiResponse";

export async function POST(request: NextRequest) {
  try {
    const result = {};

    return NextResponse.json(successResponse(result, 200));
  } catch (error) {
    return NextResponse.json(
      errorResponse("고정비용 설정 중 오류가 발생했습니다.", 500)
    );
  }
}
