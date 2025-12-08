import { useMutation } from "@tanstack/react-query";
import { generateImage } from "@/api/generate-image/generateImage";
import { GenerateImageResult } from "@/types/generateImage";

export const useGenerateImageMutation = () => {
    return useMutation<
        GenerateImageResult,
        Error,
        { prompt: string }
    >({
        mutationFn: ({ prompt }) => generateImage(prompt),

        onMutate: () => {
            console.log("이미지 생성 시작…");
        },

        onSuccess: (data) => {
            if (data.error) {
                alert(data.error);
            } else {
                console.log("이미지 생성 성공:", data.imageUrl);
            }
        },

        onError: (error) => {
            console.error("이미지 생성 중 오류:", error);
        },
    });
};
