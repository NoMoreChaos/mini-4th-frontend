import { NextRequest, NextResponse } from "next/server";
import { ok, fail } from "@/api/apiResponse";
import axios from "axios";

export async function DELETE(req: NextRequest) {
    const { userCd, bookCd } = await req.json();

    if (!userCd || !bookCd) {
        return NextResponse.json(fail("필수 값이 누락되었습니다."), { status: 400 });
    }

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.delete(`${apiUrl}/api/book/delete`, {
            data: { userCd, bookCd },
        });

        if (response.data.success) {
            return NextResponse.json(ok({ message: "삭제 완료" }));
        }
        return NextResponse.json(fail(response.data.error), { status: 400 });
    } catch (error) {
        return NextResponse.json(
            fail("서버 통신 중 오류가 발생했습니다."),
            { status: 500 }
        );
    }
}
