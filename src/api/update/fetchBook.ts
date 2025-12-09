// src/api/update/fetchBook.ts
import axios from "axios";
import type { Book } from "@/types/book";
import type { CoverImage } from "@/types/cover";

interface RawHistoryImage {
    coverCd: string;
    coverFileEn: string;
    prompt?: string;
}

interface RawBookResponse {
    bookCd: string;
    bookGenreFg: string;
    bookNm: string;
    bookSummaryDc: string;
    bookContentDc: string;
    coverCd?: string;
    coverFileEn?: string;
    historyImageList?: RawHistoryImage[];
    userCd: string;
    userNickNm: string;
}

// 🔹 실제 서버 응답 envelope 타입
interface RawEnvelope {
    success: boolean;
    error: unknown;
    data: RawBookResponse;
}

export const fetchBook = async (bookCd: string): Promise<Book> => {
    const url = `/api/update/modify?bookCd=${bookCd}`;
    console.log("📡 Client GET →", url);

    const res = await axios.get<RawEnvelope>(url);
    console.log("📥 Client received (raw envelope):", res.data);

    const raw = res.data.data;   // ✅ 진짜 책 데이터는 여기!
    console.log("📥 Client extracted book data:", raw);

    // 🔹 메인 커버 변환
    let mainCover: CoverImage | null = null;
    if (raw.coverFileEn) {
        mainCover = {
            id: raw.coverCd ?? `${raw.bookCd}-main`,
            url: raw.coverFileEn, // data:image/... 그대로 써도 됨
            prompt: "",
        };
    }

    // 🔹 히스토리 커버 리스트 변환
    const covers: CoverImage[] =
        raw.historyImageList?.map((item, idx) => ({
            id: item.coverCd ?? `history-${idx}`,
            url: item.coverFileEn,
            prompt: item.prompt ?? "",
        })) ?? [];

    // 🔹 우리 앱에서 쓰는 Book 도메인 모델로 변환
    const mapped: Book = {
        id: raw.bookCd,
        title: raw.bookNm,
        genre: raw.bookGenreFg,
        summary: raw.bookSummaryDc,
        content: raw.bookContentDc ?? "",// 서버에서 내용 내려주면 여기에 매핑
        mainCover,
        covers,
        userCd: raw.userCd,
        userNickNm: raw.userNickNm,
    };

    console.log("📘 Mapped Book:", mapped);
    return mapped;
};
