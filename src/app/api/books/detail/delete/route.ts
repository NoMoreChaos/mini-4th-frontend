import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const { searchParams } = req.nextUrl; // ★ 핵심

    const userCd = searchParams.get("userCd");
    const bookCd = searchParams.get("bookCd");

    const backendUrl =
        `http://waad.iptime.org/api/books/delete?userCd=${userCd}&bookCd=${bookCd}`;

    try {
        const response = await fetch(backendUrl, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "프록시 서버 오류 발생" },
            { status: 500 }
        );
    }
}
