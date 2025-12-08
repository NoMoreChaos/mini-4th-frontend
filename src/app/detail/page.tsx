"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { getBookDetail } from "@/api/detail/getBookDetail";
import { deleteBook } from "@/api/detail/deleteBook";
import { BookDetail } from "@/types/bookDetail";

export default function DetailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const bookCd = searchParams.get("bookCd");   // URL: /detail?id=BOOK01

    const [book, setBook] = useState<BookDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userCd, setUserCd] = useState<string | null>(null);

    useEffect(() => {
        const storedUserCd = localStorage.getItem("userCd");
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUserCd(storedUserCd);
    }, []);


    // 상세 조회 API 호출
    useEffect(()=> {
        if (!bookCd) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setError("도서 코드가 없습니다.");
            setLoading(false);
            return;
        }

        if (!userCd) return;

        async function fetchDetail() {
            const result = await getBookDetail(userCd!, bookCd!);

            if (result.success) {
                setBook(result.data);
            } else {
                setError(result.error ?? "상세 조회 중 오류가 발생했습니다.");
            }

            setLoading(false);
        }

        fetchDetail();
    }, [bookCd,userCd]);

    // 삭제 기능
    const handleDelete = async () => {
        if (!bookCd || !userCd) return;

        const confirmDelete = confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        const result = await deleteBook(userCd!, bookCd);

        if (result.success) {
            alert("삭제가 완료되었습니다.");
            router.push("/"); // 책 목록 페이지 또는 홈으로 이동
        } else {
            alert(result.error ?? "삭제 중 오류가 발생했습니다.");
        }
    };

    // 로딩 화면
    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">불러오는 중...</div>
        );
    }

    // 에러 화면
    if (error) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                <p className="text-red-500 mb-4">{error}</p>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    ← 뒤로가기
                </button>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-10">
                책 정보를 찾을 수 없습니다.
            </div>
        );
    }

    // ---------------------------------------------
    // 실제 UI 표시 (책 상세)
    // ---------------------------------------------

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* 책 기본 정보 */}
            <div className="bg-white rounded-xl shadow p-8 flex gap-8 mb-10">

                {/* 표지 이미지 */}
                <div className="w-60 h-80 bg-gray-100 rounded overflow-hidden">
                    {book.coverFileEn ? (
                        <Image
                            src={`data:image/png;base64,${book.coverFileEn}`}
                            alt="book cover"
                            width={400}
                            height={600}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            표지 없음
                        </div>
                    )}
                </div>

                {/* 책 정보 텍스트 */}
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{book.bookNm}</h1>

                    <p className="text-gray-700 mb-1">작성자: {book.userNickNm}</p>
                    <p className="text-gray-700 mb-1">장르: {book.bookGenreFg}</p>
                    <p className="text-gray-700 mb-4">생성일: {book.bookCreateDt}</p>

                    <p className="text-gray-600 whitespace-pre-line">
                        {book.bookSummaryDc}
                    </p>
                </div>
            </div>

            {/* 도서 내용 */}
            <div className="bg-white rounded-xl shadow p-8 mb-10">
                <h2 className="text-2xl font-semibold mb-4">본문 내용</h2>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {book.bookContentDc}
                </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-3 mt-10">
                <button
                    onClick={() => router.push("/")}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    목록
                </button>

                <button
                    onClick={() => router.push(`/bookEdit?bookCd=${book.bookCd}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    수정
                </button>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                >
                    삭제
                </button>
            </div>
        </div>
    );
}
