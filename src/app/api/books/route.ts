import {NextRequest, NextResponse} from "next/server";
import axios from "axios";
import {BookListResponse} from "@/types/book";
import {ApiResult} from "@/api/apiResponse";

/**
 * 책 목록 조회를 위한 API 라우트
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const limit = searchParams.get("limit") ?? "10";
    const page = searchParams.get("page") ?? "1";
    const userCd = searchParams.get("userCd");

    if (!userCd) {
        return NextResponse.json(
            {error: "userCd 파라미터가 필요합니다."},
            { status: 400 }
        );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    try {
        const response = await axios.get<ApiResult<BookListResponse>>(`${apiUrl}/api/books`, {
            params: { limit, page, userCd }
        });
        return NextResponse.json(response.data.data);

    } catch (error) {
        console.error("Fetching books error:", error);

        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.error ?? "책 목록을 가져오는 중 서버와 통신에 실패했습니다.";
            const status = error.response?.status ?? 500;
            return NextResponse.json({error : message}, { status });
        }

        return NextResponse.json(
            {error :"책 목록을 조회하는 중 예기치 않은 오류가 발생했습니다."},
            { status: 500 }
        );
    }
}
