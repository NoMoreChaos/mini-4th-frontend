import { Suspense } from 'react';
import HomePageClient from './homePageClient';
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

function Loading() {
    return (
        <main className="flex flex-col items-center w-full min-h-screen px-8 py-10 bg-white text-black">
            <div className="flex justify-between items-center w-full max-w-5xl mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-2 ">
                    <AutoStoriesOutlinedIcon sx={{mr: 1}}/> Walking Library
                </h2>
            </div>

            <div className="flex justify-between items-center w-full max-w-5xl mb-6 ">
                <h2 className="text-2xl font-semibold">BOOK LIST</h2>
            </div>
            <div>Loading...</div>
        </main>
    );
}

export default function HomePage() {
    return (
        <Suspense fallback={<Loading />}>
            <HomePageClient />
        </Suspense>
    );
}
