"use client";

import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {Pagination} from "@mui/material";
import {books} from "@/app/data/books";
import BookCard from "@/app/components/BookCard";
import React from "react";

export default function BookList() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(searchParams.get('page')) || 1;
    const limit = 5; // 페이지당 보여줄 책의 수
    const count = 30; // 전체 페이지 수 (API로부터 받아와야 할 값)

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', value.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div>
            <div className="w-full max-w-5xl">
                {/*
                    todo 1: 실제 API 연동 시에는 더미데이터 X 실제 데이터로 변경
                    todo 2: 추가로 key={idx} book.book_id 로 수정 예정
                */}
                {books.map((book, idx) => (
                    <BookCard key={idx} {...book} />
                ))}
            </div>

            <div className="flex justify-center w-full max-w-5xl mt-8">
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                    color="secondary"
                    showFirstButton
                    showLastButton
                />
            </div>
        </div>
    );
}
