export type BookDetail = {
    bookCd: string;          // 도서 코드
    bookNm: string;          // 도서명
    bookSummaryDc: string;   // 작품 소개(요약)
    bookContentDc: string;   // 도서 내용(본문)
    userCd: string;          // 생성자 코드
    userNickNm: string;      // 사용자 닉네임
    bookGenreFg: string;     // 장르
    bookCreateDt: string;    // 생성일시
    bookModifyDt: string;    // 최근 수정일시
    coverFileEn: string;     // 표지 이미지
    coverCd: string;         // 표지 코드
};
