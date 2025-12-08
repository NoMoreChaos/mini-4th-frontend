import { NextRequest, NextResponse } from "next/server";
import { ok, fail } from "@/api/apiResponse";
import axios from "axios";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userCd = searchParams.get("userCd");
    const bookCd = searchParams.get("bookCd");

    if (!userCd || !bookCd) {
        return NextResponse.json(fail("필수 파라미터가 없습니다."), { status: 400 });
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/book/detail`, {
            params: { userCd, bookCd },
        });

        if (response.data.success) {
            return NextResponse.json(ok(response.data.data));
        } else {
            return NextResponse.json(fail(response.data.error), { status: 400 });
        }
    } catch (error: unknown) {
        return NextResponse.json(
            fail("서버 통신 중 오류가 발생했습니다."),
            { status: 500 }
        );
    }
}
