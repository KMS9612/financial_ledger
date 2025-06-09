import { NextRequest, NextResponse } from "next/server";
import { errorResponse, successResponse } from "../common/utils/apiResponse";
import {
  createFixedData,
  getFixedData,
  updateFixedData,
} from "./repositories/fixed.repository";

export async function POST(request: NextRequest) {
  try {
    const { email, saving, fixed, income } = await request.json();

    const result = await createFixedData({ email, saving, fixed, income });

    return NextResponse.json(successResponse(result, 200));
  } catch (error) {
    return NextResponse.json(
      errorResponse("고정비용 설정 중 오류가 발생했습니다.", 500)
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { email } = await request.json();
    const result = await getFixedData(email);

    return NextResponse.json(successResponse(result, 200));
  } catch (err) {
    return NextResponse.json(
      errorResponse("fixed_data 데이터 조회에 실패했습니다.", 500)
    );
  }
}

export async function UPDATE(request: NextRequest) {
  try {
    const { email, saving, income, fixed } = await request.json();

    const result = await updateFixedData({ email, saving, income, fixed });
    if (!result) {
      return NextResponse.json(
        errorResponse("fixed_data 업데이트에 실패했습니다.", 500)
      );
    }

    return NextResponse.json(successResponse(true, 200));
  } catch (err) {
    return NextResponse.json(
      errorResponse("fixed_data 업데이트에 실패했습니다.", 500)
    );
  }
}
