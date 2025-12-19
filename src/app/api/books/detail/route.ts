import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const userCd = searchParams.get("userCd");
    const bookCd = searchParams.get("bookCd");

    const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/books/detail?userCd=${userCd}&bookCd=${bookCd}`;

    try {
        const response = await fetch(backendUrl, {
            method: "GET",
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
