// src/app/api/generateImage/route.ts
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "프롬프트를 입력해주세요." }, { status: 400 });
        }

        // 타입 명시
        const response: OpenAI.Images.ImagesResponse =
            await openai.images.generate({
                model: "dall-e-3",
                prompt: prompt,
                size: "1024x1024",
                n: 1,
                quality: "standard",
            });

        const imageUrl = response.data?.[0]?.url;

        if (!imageUrl) {
            return NextResponse.json(
                { error: "이미지 URL을 받아오지 못했습니다." },
                { status: 500 }
            );
        }

        return NextResponse.json({ imageUrl });

    } catch (error) {
        console.error("Image generation error:", error);

        let errorMessage = "이미지 생성 중 오류가 발생했습니다.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
