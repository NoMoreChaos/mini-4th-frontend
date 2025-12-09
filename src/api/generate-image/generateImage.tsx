// src/api/generate-image/generateImage.tsx
import axios from "axios";

// API 응답 타입을 정의합니다.
interface GenerateImageResult {
    imageUrl?: string;
    error?: string;
}

/**
 * 클라이언트에서 호출하는 이미지 생성 함수.
 * 내부 API 라우트(/api/generate-image)를 호출합니다.
 * @param prompt - 이미지 생성을 위한 텍스트 프롬프트
 */
export const generateImage = async (prompt: string): Promise<GenerateImageResult> => {
    if (!prompt) {
        return { error: "프롬프트를 입력해주세요." };
    }

    try {
        const response = await axios.post<GenerateImageResult>('/api/generate-image', { prompt });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
            return { error: error.message };
        }

        return { error: "이미지 생성 중 알 수 없는 오류가 발생했습니다." };
    }
};
