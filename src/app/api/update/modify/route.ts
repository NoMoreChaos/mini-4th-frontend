// app/api/update/modify/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const bookCd = searchParams.get("bookCd");

        if (!bookCd) {
            return NextResponse.json(
                { error: "bookCd parameter is required." },
                { status: 400 }
            );
        }

        const targetUrl = `${BASE_URL}/api/book/modify?bookCd=${bookCd}`;
        console.log("📡 Proxy GET → ", targetUrl);

        const response = await axios.get(targetUrl);
        return NextResponse.json(response.data);
    } catch (err: unknown) {
        const error = err as AxiosError<unknown>;

        console.error(
            "❌ Proxy GET error:",
            error.response?.data || error.message || error
        );

        return NextResponse.json(
            {
                error: "Failed to fetch book from backend",
                backendStatus: error.response?.status ?? null,
                backendData: error.response?.data ?? null,
                message: error.message,
            },
            { status: error.response?.status ?? 500 }
        );
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("📤 Proxy PUT body from client:", body);

        const targetUrl = `${BASE_URL}/api/book/modify`; // ✅ 백엔드 PUT URL (GET과 동일 path라 가정)
        console.log("📡 Proxy PUT →", targetUrl);

        const response = await axios.put(targetUrl, body);

        return NextResponse.json(response.data);
    } catch (err: unknown) {
        const error = err as AxiosError<unknown>;
        console.error(
            "❌ Proxy PUT error:",
            error.response?.data || error.message || error
        );

        return NextResponse.json(
            {
                error: "Failed to update book on backend",
                backendStatus: error.response?.status ?? null,
                backendData: error.response?.data ?? null,
                message: error.message,
            },
            { status: error.response?.status ?? 500 }
        );
    }
}

