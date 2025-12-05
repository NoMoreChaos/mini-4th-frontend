import Link from "next/link";

export default function DetailPage({
                                       searchParams,
                                   }: {
    searchParams: { id?: string };
}) {
    const id = searchParams.id;

    // Mock Data (추후 API 연결로 대체)
    const book = {
        title: "The Seasons of Memory",
        author: "야호작가",
        genre: "Fantasy",
        summary: "이 책은 기억을 잃은 한 남성에 대한 이야기 입니다.(책 요약)",
        cover: "/next.svg",
        chapters: [
            {
                title: "1장 · 어둠의 그",
                content:
                    "내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용\n내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 ",
            },
        ],
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">

            {/* 책기본 정보*/}
            <div className="bg-white rounded-xl shadow p-8 flex gap-8 mb-10">
                <div className="w-100 h-120 bg-gray-100 rounded overflow-hidden">
                    <img src={book.cover} alt="book cover" className="w-full h-full object-cover" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
                    <p className="text-gray-700 mb-1">작성자: {book.author}</p>
                    <p className="text-gray-700 mb-4">장르: {book.genre}</p>
                    <p className="text-gray-600">{book.summary}</p>
                </div>
            </div>{/* 책 내용 */}
            {book.chapters.map((chapter, index) => (
                <div key={index} className="bg-white rounded-xl shadow p-8 mb-10">
                    <h2 className="text-xl font-bold mb-4">{chapter.title}</h2>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {chapter.content}
                    </p>
                </div>
            ))}

            {/* 버튼 영역 */}
            <div className="flex gap-3 mt-10 justify-end">
                <Link href="/list"/*목록주소*/ className="px-4 py-2 bg-gray-200 rounded">목록</Link>
                <Link href={`/edit?id=${id}`}/*수정페이지 주소*/ className="px-4 py-2 bg-blue-500 text-white rounded">수정</Link>
                <button className="px-4 py-2 bg-red-500 text-white rounded">삭제</button>
            </div>
        </div>
    );
}
