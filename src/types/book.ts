// src/types/update.ts
import { CoverImage } from "./cover";

export interface BookHome {
    bookCd: string;
    bookNm: string;
    bookSummaryDc: string;
    bookGenreFg: string;
    bookCreateDt: string;
    bookModifyDt: string;
    coverFileEn: string;
}

export interface Book {
    id: string;
    title: string;
    genre: string;
    summary: string;
    content: string;
    mainCover: CoverImage | null;
    userCd?: string
    userNickNm: string
    covers: CoverImage[];
}



// 폼 상태를 한 번에 찍어두는 로그
export interface BookEditLog {
    id: string;          // 로그 고유 id
    bookId: string;      // 어떤 책에 대한 로그인지
    title: string;
    genre: string;
    summary: string;
    content: string;
    imageUrl: string | null;
    userCd?: string; // 현재 선택된 표지의 url (없으면 null)
    changedAt: string;   // ISO 타임스탬프
}

export interface BookListResponse {
    totalCount: number;
    bookList: BookHome[];
}
