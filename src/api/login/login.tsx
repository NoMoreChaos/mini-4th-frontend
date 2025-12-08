import {ApiResult, fail, ok} from "@/api/apiResponse";
import {LoginResult} from "@/types/login";
import axios from "axios";

export const postLogin = async (
    email: string,
    password: string
): Promise<ApiResult<LoginResult>> => {
    try {
        const response = await axios.post("/api/login", { email, password });
        console.log(response);
        if (response.data.success) {
            return ok<LoginResult>(response.data.data);
        } else {
            return fail<LoginResult>(response.data.error ?? "로그인 실패");
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error ?? error.message;
            return fail<LoginResult>(message);
        }

        return fail<LoginResult>("로그인 요청 중 오류가 발생했습니다.");
    }
}