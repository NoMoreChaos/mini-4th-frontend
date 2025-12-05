"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { bookMock } from "./data/data";

export default function DetailPage({ searchParams }: { searchParams: { id?: string } }) {
    const router = useRouter();
    const id = searchParams.id;

    // 명세서 구조 기준으로 data 안에서 꺼내기
    const book = bookMock.data;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* 책 기본 정보 */}
            <div className="bg-white rounded-xl shadow p-8 flex gap-8 mb-10">

                <div className="w-100 h-120 bg-gray-100 rounded overflow-hidden">
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
                            이미지 없음
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{book.bookNm}</h1>
                    <p className="text-gray-700 mb-1">작성자: {book.userNickNm}</p>
                    <p className="text-gray-700 mb-4">장르: {book.bookGenreFg}</p>
                    <p className="text-gray-600">책 요약: {book.bookSummaryDc}</p>
                </div>
            </div>

            {/* 책 내용 */}
            <div className="bg-white rounded-xl shadow p-8 mb-10">
                <h2 className="text-xl font-bold mb-4">본문</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {book.bookContentDc}
                </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-3 mt-10 justify-end">

                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    목록
                </button>

                <Link
                    href={`/edit?id=${id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    수정
                </Link>

                <button className="px-4 py-2 bg-red-500 text-white rounded">
                    삭제
                </button>
            </div>
        </div>
    );
}
