"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { bookMock } from "./data/data";

export default function DetailPage({ searchParams }: { searchParams: { id?: string } }) {
    const router = useRouter();
    const id = searchParams.id;
    const userCd =
        typeof window !== "undefined" ? localStorage.getItem("userCd") : null;

    const book = bookMock.data;

    const handleDelete = async () => {
        if (!id) return alert("삭제할 책 ID가 없습니다.");

        const confirmDelete = confirm("정말 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/books/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userCd: userCd,
                    bookCd: id
                }),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                alert("정상적으로 삭제되었습니다.");
                router.push("/");
            } else {
                alert("삭제 실패: " + (result.error || "알 수 없는 오류"));
            }
        } catch (err) {
            console.error(err);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            {/*좌측 상단 뒤로가기 버튼 추가 */}
            <div className="mb-6">
                <button
                    onClick={() => router.back()}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    ← 뒤로가기
                </button>
            </div>

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

                <Link href="/"/*목록으로 돌아가기*/
                      className="px-4 py-2 bg-gray-200 rounded"
                >
                    목록
                </Link>

                <Link
                    href={`/edit?id=${id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    수정
                </Link>

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
