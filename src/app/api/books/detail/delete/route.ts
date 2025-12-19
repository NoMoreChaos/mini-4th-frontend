import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const userCd = searchParams.get("userCd");
    const bookCd = searchParams.get("bookCd");

    if (!userCd || !bookCd) {
        return NextResponse.json(
            { success: false, error: "필수 파라미터 누락" },
            { status: 400 }
        );
    }

    const backendUrl =
        `${process.env.BACKEND_BASE_URL}/api/books/delete?userCd=${userCd}&bookCd=${bookCd}`;

    try {
        const response = await fetch(backendUrl, {
            method: "DELETE",
            cache: "no-store",
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { success: false, error: "프록시 서버 오류 발생" },
            { status: 500 }
        );
    }
}
