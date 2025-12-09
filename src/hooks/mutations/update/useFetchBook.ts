//src/hooks/mutations/update/useFetchBook.ts
import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "@/api/update/fetchBook";
import type { Book } from "@/types/book";

export const useFetchBook = (bookCd: string | null) => {
    return useQuery<Book>({
        queryKey: ["book", bookCd],
        queryFn: () => fetchBook(bookCd!),
        enabled: !!bookCd,  // bookCd 있을 때만 실행
    });
};
