import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
    try {
        const { title, genre, summary, content } = await req.json();
        const api_key = process.env.OPENAI_API_KEY;

        console.log("api_key: " + api_key);
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const prompt = `
            당신은 책 표지 전문 디자이너입니다.
            아래 정보를 기반으로 표지 일러스트를 만들기 위한 상세한 디자인 프롬프트를 작성하세요.
            
            도서명: ${title}
            장르: ${genre}
            작품 소개: ${summary}
            내용 설명: ${content}
            
            프롬프트는 다음 요소를 포함하세요:
            - 주요 분위기
            - 표지의 전반적인 색감 및 톤
            - 등장인물 또는 상징 요소
            - 시대적 배경 또는 장면
            - 원하는 일러스트 느낌(예: 파스텔톤, 미니멀, 현실적, 판타지풍 등)
            - 표지에 포함되면 좋은 디테일
            
            최종 출력은 
            디자이너가 그대로 사용할 수 있는 프롬프트 문장 한 개로 작성하고 기호나 따옴표는 없이 300자 이내로 작성하세요.
            
        `;

        const resp = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "당신은 전문적인 북 커버 디자이너입니다." },
                { role: "user", content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 500,
        });

        const generated = resp.choices?.[0]?.message?.content?.trim() ?? "";

        return NextResponse.json({ prompt: generated });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "프롬프트 생성 실패" },
            { status: 500 }
        );
    }
}
