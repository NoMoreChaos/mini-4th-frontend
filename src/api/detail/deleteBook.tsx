import axios from "axios";
import { ApiResult } from "@/api/apiResponse";

export type DeleteResult = {
    message: string;
};

export const deleteBook = async (
    userCd: string,
    bookCd: string
): Promise<ApiResult<DeleteResult>> => {
    try {
        const response = await axios.delete<ApiResult<DeleteResult>>(
            "/api/books/detail/delete",
            { data: { userCd, bookCd } }
        );
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                data: null,
                error: error.response?.data?.error ?? "삭제 실패",
            };
        }

        return {
            success: false,
            data: null,
            error: "알 수 없는 오류가 발생했습니다.",
        };
    }
};
