export interface Book {
    bookCd: string;
    bookNm: string;
    bookSummaryDc: string;
    bookGenreFg: string;
    bookCreateDt: string;
    bookModifyDt: string;
    coverFileEn: string;
}

export interface BookListResponse {
    totalCount: number;
    bookList: Book[];
}
