import {NextPage} from "next";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import {Suspense} from "react";
import BookList from "@/app/components/BookList";

const HomePage: NextPage = () => {
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

            <Suspense fallback={<div>Loading...</div>}>
                <BookList/>
            </Suspense>
        </main>
    );
}

export default HomePage;