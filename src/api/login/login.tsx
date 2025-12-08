import {ApiResult} from "@/api/apiResponse";
import {LoginResult} from "@/types/login";
import axios from "axios";

/**
 * 클라이언트에서 호출하는 로그인 함수.
 * 내부 API 라우트(/api/login)를 호출합니다.
 */
export const postLogin = async (
    email: string,
    password: string
): Promise<ApiResult<LoginResult>> => {
    try {
        const response = await axios.post<ApiResult<LoginResult>>(`/api/login`, { email, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return error.response.data;
            }
            return { success: false, data: null, error: error.message };
        }
        return { success: false, data: null, error: "로그인 요청 중 알 수 없는 오류가 발생했습니다." };
    }
}