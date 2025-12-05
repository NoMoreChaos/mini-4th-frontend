"use client";

import {NextPage} from "next";
import {Button, Pagination} from "@mui/material";
import BookCard from "@/app/components/BookCard";
import AddIcon from '@mui/icons-material/Add';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import {books} from "@/app/data/books";
import {useRouter, usePathname, useSearchParams} from "next/navigation";

const HomePage: NextPage = () => {
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

            {/*
                todo 1: 실제 API 연동 시에는 더미데이터 X 실제 데이터로 변경
                todo 2: 추가로 key={idx} book.book_id 로 수정 예정
            */}
            <div className="w-full max-w-5xl">
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
        </main>
    );
}

export default HomePage;