import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    const body = await req.json();
    const { userCd, bookCd } = body;

    const backendUrl = "http://waad.iptime.org/api/books/delete";

    try {
        const response = await fetch(backendUrl, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userCd, bookCd })
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
