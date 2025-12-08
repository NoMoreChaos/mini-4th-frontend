import { NextResponse } from "next/server";

const OPENAI_API_URL = "https://api.openai.com/v1/images/generations";
const REQUEST_IMG_SIZE = "1024x1024";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { title, genre, summary, content, promptDetail } = body || {};

        if (!title || !genre || !summary || !content) {
            return NextResponse.json(
                { error: "도서 명, 장르, 작품 소개, 내용을 모두 입력해주세요." },
                { status: 400 }
            );
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            console.error("OPENAI_API_KEY not set");
            return NextResponse.json(
                { error: "서버 설정 오류: OPENAI_API_KEY가 없습니다." },
                { status: 500 }
            );
        }

        const prompt = `
            당신은 전문적인 그래픽 아티스트입니다.
            
            아래 스토리 정보를 바탕으로, 스토리의 감정을 만들고
            순수한 평면 2D 추상 그래픽 형태로 표현한 단일 이미지를 만들어 주세요.
            단, 선택된 장르 분위기를 최우선으로 반영합니다.
            
            [스토리 분위기 정보]
            제목: ${title}
            장르: ${genre}
            내용 요약: ${summary}
            세부 내용: ${content}
            추가 요청: ${promptDetail || "없음"}
            
            [절대 포함되지 않는 요소]
            - 책 형태, 표지 구조, 페이지 느낌, 모형(Mockup)
            - 텍스트, 숫자, 문자처럼 보이는 요소
            - 포스터 프레임, 테두리, 여백 표현, 종이 형태
            - 3D 효과, 그림자, 입체감, 사진적 질감
            - 패널, 분할 레이아웃, 격자, 아이콘 배열
            
            [상단 여백]
            - 이미지 상단 약 25%는 완전히 비워진 공간(blank title area)으로 유지합니다.
            - 이 영역에는 그래픽 요소, 패턴, 점, 선, 색 변화 등 시각적 요소를 넣지 않습니다.
            
            [사용자 추가 요청 반영 규칙]
            - 추가 요청(promptDetail)은 디자인의 분위기·색감·패턴·구성 방향 등의 추상적 요소에만 적용합니다.
            - 추가 요청이 있더라도 [절대 포함되지 않는 요소]는 반드시 지킵니다.
            
            [필수 디자인 구성]
            - 화면의 나머지 75%를 추상적·상징적 형태로 구성합니다.
            - 도서 정보에서 유추되는 분위기만 색감과 조형 언어로 표현합니다.
            - 장면 묘사(하늘, 물, 산, 배경 등)는 포함하지 않습니다.
            - 세부 패널, 카드, 레이아웃 구분 없이 하나의 디자인으로 구성합니다.
            
            [스타일]
            - 완전한 flat 2D 그래픽
            - 부드럽고 조화로운 추상 패턴 또는 곡선 구조
            - 장르 분위기를 전달하는 색감 조합
            
            [OUTPUT]
            - 단일 평면 2D 추상 그래픽 이미지 1장
            - 상단 비어 있음, 하단 그래픽 구성
        `;

        const res = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt,
                n: 1,
                size: REQUEST_IMG_SIZE,
            }),
        });

        if (!res.ok) {
            //OpenAI 에러면 그대로 클라이언트에 메시지 전달
            try {
                const detail = await res.json();
                console.error("OpenAI error JSON:", detail);
                const msg = detail?.error?.message || "이미지 생성 실패 (OpenAI)";
                return NextResponse.json({ error: msg }, { status: res.status });
            } catch {
                const text = await res.text();
                console.error("OpenAI error (non-JSON):", text);
                return NextResponse.json(
                    { error: "OpenAI 응답 파싱 실패: " + text.slice(0, 200) },
                    { status: res.status }
                );
            }
        }

        // ✅ 성공 케이스 파싱
        const json = await res.json();
        const url = json?.data?.[0]?.url;

        console.log("✅ OpenAI image response:", JSON.stringify(json, null, 2));

        if (!url) {
            return NextResponse.json(
                { error: "이미지 URL을 받지 못했습니다." },
                { status: 500 }
            );
        }

        // 클라이언트에 URL만 반환
        return NextResponse.json({ url: url});
    } catch (err: unknown) {
        console.error(err);
        const message = err instanceof Error ? err.message : "서버 내부 오류";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}