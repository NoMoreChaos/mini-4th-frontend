'use client'

import {NextPage} from "next";
import {Button, Pagination} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getBookList} from "@/api/books/bookList";
import {useRouter, useSearchParams} from "next/navigation";
import {BookHome} from "@/types/book";
import BookCard from "@/app/components/BookCard";

const HomePage: NextPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [userCd, setUserCd] = useState<string | null>(null);

    useEffect(() => {
        const storedUserCd = localStorage.getItem("userCd");
        setUserCd(storedUserCd);
    }, []);

    const page = Number(searchParams.get('page')) || 1;
    const limit = 5;
    const { data: bookData, error, isLoading, isError } = useQuery({
        queryKey: ['books', page, limit, userCd],
        queryFn: () => getBookList(page, limit, userCd!),
        enabled: !!userCd,
    });

    const totalCount = bookData?.totalCount ?? 0;
    const totalPage = Math.ceil(totalCount / limit);

    const bookList = bookData?.bookList ?? [];

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        router.push(`?page=${value}`);
    };

    return (
        <main className="flex flex-col items-center w-full min-h-screen px-8 py-10 bg-white text-black">
            <div className="flex justify-between items-center w-full max-w-5xl mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2 ">
                    <AutoStoriesOutlinedIcon sx={{mr: 1}}/> Walking Library
                </h2>

                <Button variant="contained" sx={{backgroundColor: 'black', '&:hover': {backgroundColor: '#333'}}}>
                    My Bookshelf
                </Button>
            </div>

            <div className="flex justify-between items-center w-full max-w-5xl mb-6 ">
                <h2 className="text-2xl font-semibold">BOOK LIST</h2>

                <Button variant="contained" sx={{backgroundColor: 'black', '&:hover': {backgroundColor: '#333'}}}>
                    <AddIcon fontSize={"small"} sx={{mr: 1}}/> Add Book
                </Button>
            </div>
            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error: 데이터를 불러오지 못했습니다.</div>
            ) : (
                <div className="w-full max-w-5xl mb-6">
                    <div className="w-full">
                        {bookList.map((book: BookHome) => (
                            <BookCard key={book.bookCd} {...book} />
                        ))}
                    </div>

                    <div className="flex justify-center w-full mt-8">
                        <Pagination
                            count={totalPage}
                            page={page}
                            onChange={handlePageChange}
                            color="secondary"
                            showFirstButton
                            showLastButton
                        />
                    </div>
                </div>
            )}
        </main>
    );
}

export default HomePage;