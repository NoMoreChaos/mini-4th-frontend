import { useMutation } from "@tanstack/react-query";
import { postLogin } from "@/api/login/login";
import { ApiResult } from "@/api/apiResponse";
import { LoginResult } from "@/types/login";
import {useRouter} from "next/navigation";

export const useLoginMutation = () => {
    const router = useRouter();
    return useMutation<
        ApiResult<LoginResult>,
        Error,
        { email: string; password: string }
    >({
        mutationFn: ({ email, password }) => postLogin(email, password),

        onMutate: () => {
            console.log("로그인 요청 시작");
        },

        onSuccess: (data) => {
            if (data.success && data.data) {
                // 로컬 스토리지에 userCd를 저장합니다.
                localStorage.setItem('userCd', data.data.userCd);
                router.push("/");
            } else {
                alert(data.error ?? "로그인 실패");
            }
        },

        onError: (error) => {
            console.error("로그인 중 오류:", error);
        },
    });
};
