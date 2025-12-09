"use client";

import Image from "next/image";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Book} from "@/types/book";


export default function BookCard({bookNm, bookCreateDt, bookSummaryDc, coverFileEn}: Book) {
    return (
        <Card className="w-full shadow-md rounded-4xl mb-6">
            <CardActionArea
                onClick={() => {}}
                sx={{
                    height: '100%',
                    '&:hover': {
                        backgroundColor: 'action.selectedHover',
                    },
                }}
            >
                <CardContent
                    sx={{
                        display: "flex",
                        gap: 3,
                        py: 6,
                        px: 3
                    }}
                >
                    <div className="w-28 h-40 relative flex-shrink-0">
                        <Image
                            src={coverFileEn}
                            alt={bookNm}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                        <Typography variant="h6" className="font-bold" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {bookNm}
                        </Typography>

                        <Typography
                            variant="body2"
                            className="mt-2 text-gray-700"
                            sx={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                minHeight: '80px', // 3 lines height
                            }}
                        >
                            {bookSummaryDc}
                        </Typography>

                        <Typography variant="body2" className="text-gray-600" sx={{textAlign: 'right'}}>
                            {new Date(bookCreateDt).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
