import { NextRequest, NextResponse } from "next/server";

// 책 등록 API (프론트에서 /api/update-Regist 로 호출)
export async function POST(req: NextRequest) {
    try {
        // 프론트에서 보낸 JSON 받기
        const body = await req.json();

        // 필요한 값들 꺼내서 간단 검증
        const {
            userCd,
            bookNm,
            bookSummaryDc,
            bookContentDc,
            bookGenreFg,
            coverPromptDc,
            coverCd,
            coverFileEn,
        } = body;

        if (!bookNm || !bookSummaryDc || !bookContentDc || !bookGenreFg || !coverFileEn) {
            return NextResponse.json(
                { error: "필수 값이 누락되었습니다." },
                { status: 400 }
            );
        }

        // 실제 백엔드(스프링 등)로 전달할 주소
        const backendBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        console.log("POST backendBaseUrl", backendBaseUrl);
        if (!backendBaseUrl) {
            return NextResponse.json(
                { error: "BACKEND_API_BASE_URL 이 설정되어 있지 않습니다." },
                { status: 500 }
            );
        }

        // 실제 서버의 책 등록 엔드포인트
        const backendUrl = `${backendBaseUrl}/api/books`;
        const backendRes = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userCd,
                bookNm,
                bookSummaryDc,
                bookContentDc,
                bookGenreFg,
                coverPromptDc,
                coverCd,
                coverFileEn,
            }),
        });

        if (!backendRes.ok) {
            let msg = "작품 등록 실패";
            try {
                const data = await backendRes.json();
                if (data?.error) msg = data.error;
            } catch {
                // JSON 파싱 실패 시 그냥 기본 메시지
            }

            return NextResponse.json({ error: msg }, { status: backendRes.status });
        }

        // 백엔드에서 온 내용을 그대로 넘김
        const result = await backendRes.json().catch(() => null);

        return NextResponse.json(result ?? { success: true }, { status: 200 });
    } catch (err) {
        console.error("update-Regist error:", err);
        return NextResponse.json(
            { error: "서버 내부 오류가 발생했습니다." },
            { status: 500 }
        );
    }
}