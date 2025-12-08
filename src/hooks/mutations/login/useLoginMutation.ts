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
            if (data.success) {
                alert("로그인 성공!");
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
