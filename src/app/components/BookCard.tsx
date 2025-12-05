"use client";

import Image from "next/image";
import {Card, CardActionArea, CardContent, Typography} from "@mui/material";

interface BookCardProps {
    title: string;
    author: string;
    date: string;
    description: string;
    image: string;
}

export default function BookCard({title, author, date, description, image}: BookCardProps) {
    return (
        <Card className="w-full max-w-5xl shadow-md rounded-4xl mb-6">
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
                            src={image}
                            alt={title}
                            fill
                            className="object-cover rounded-md"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <Typography variant="h6" className="font-bold" sx={{ fontWeight: 'bold', mb: 2 }}>
                            {title}
                        </Typography>

                        <Typography variant="body2" className="text-gray-600" sx={{ fontWeight: 'semibold' }}>
                            작성자: {author}
                        </Typography>

                        <Typography variant="body2" className="text-gray-600">
                            생성일자: {date}
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
                            }}
                        >
                            {description}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
