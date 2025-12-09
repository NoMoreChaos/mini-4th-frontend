// src/api/update/updateBook.ts
import axios from "axios";

export interface UpdateBookPayload {
    userCd: string;
    userNickNm: string;
    bookCd: string;
    bookNm: string;
    bookSummaryDc: string;
    bookContentDc: string;
    bookGenreFg: string;
    coverFileEn: string;   // 선택된 메인 표지 URL (dataURL or http URL)
    coverCd: string;       // 선택된 표지 코드 (selectedCover.id)
}

export const updateBook = async (payload: UpdateBookPayload) => {
    const url = `/api/update/modify`;
    console.log("📡 Client PUT →", url, payload);

    const res = await axios.put(url, payload);
    console.log("📥 Client PUT response:", res.data);
    return res.data;
};
