import axios from "axios";
import { ApiResult } from "@/api/apiResponse";
import { BookDetail } from "@/types/bookDetail";

export const getBookDetail = async (
    userCd: string,
    bookCd: string
): Promise<ApiResult<BookDetail>> => {
    try {
        const response = await axios.get<ApiResult<BookDetail>>(
            "/api/books/detail/get",
            { params: { userCd, bookCd } }
        );
        return response.data;
    } catch (error: unknown) {  // ← any 제거
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                error: error.response?.data?.error ?? "상세 조회 실패",
            };
        }

        return {
            success: false,
            data: null,
            error: "알 수 없는 오류가 발생했습니다.",
        };
    }
};
