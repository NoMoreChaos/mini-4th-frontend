import Link from "next/link";
import { bookMock } from "./data/data";

export default function DetailPage({ searchParams }: { searchParams: { id?: string } }) {
    const id = searchParams.id;

    const book = bookMock;

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* 책기본 정보 */}
            <div className="bg-white rounded-xl shadow p-8 flex gap-8 mb-10">
                <div className="w-100 h-120 bg-gray-100 rounded overflow-hidden">
                    <img src={book.book_image} alt="book cover" className="w-full h-full object-cover" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-gray-700 mb-1">작성자: {book.username}</p>
                    <p className="text-gray-700 mb-4">장르: {book.genre}</p>
                    <p className="text-gray-600">책 요약: {book.summary}</p>
                </div>
            </div>

            {/* 책 내용 */}
            <div className="bg-white rounded-xl shadow p-8 mb-10">
                <h2 className="text-xl font-bold mb-4">본문</h2>
                <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {book.content}
                </p>
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-3 mt-10 justify-end">

                {/* 목록? 뒤로가기? */}
                <Link href="/" className="px-4 py-2 bg-gray-200 rounded">목록</Link>

                <Link
                    href={`/edit?id=${id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    수정
                </Link>

                <button className="px-4 py-2 bg-red-500 text-white rounded">삭제</button>
            </div>
        </div>
    );
}
