import axios from "axios";
import { BookListResponse } from "@/types/book";

/**
 * 클라이언트에서 책 목록을 조회하는 함수.
 * 내부 API 라우트(/api/books)를 호출합니다.
 * @param page - 페이지 번호
 * @param limit - 한 페이지에 보여줄 책의 수
 * @param userCd - 사용자 코드
 */
export const getBookList = async (
    page: number,
    limit: number = 10,
    userCd: string | null
): Promise<BookListResponse> => {
    if (!userCd) {
        throw new Error("로그인이 필요합니다. userCd가 없습니다.");
    }

    try {
        const response = await axios.get<BookListResponse>(`/api/books?limit=${limit}&page=${page}&userCd=${userCd}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || error.message;
            throw new Error(errorMessage);
        }
        throw new Error("책 목록을 가져오는 중 알 수 없는 오류가 발생했습니다.");
    }
};
