// src/components/covers/MainPreviewCover.tsx
"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CoverImage } from "@/types/cover";

interface  MainPreviewCoverProps {
    cover: CoverImage | null;
}

export default function MainPreviewCove({ cover }: MainPreviewCoverProps) {
    if(!cover){
        // 선택된 표지가 없을 때
        return (
            <Box mb={2}>
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 0.5 }}
                >
                    Main Cover
                </Typography>
                <Card
                    sx={{
                        borderRadius: 2,
                        border: "1px dashed #ccc",
                        height: 220,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "#fafafa",
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        No cover selected yet. Generate a cover on the right and choose one.
                    </Typography>
                </Card>
            </Box>
        );
    }
    // 표지가 선택된 상태
    return (
        <Box mb={2}>
            <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
            >
                Main Cover
            </Typography>
            <Card
                sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 220, // 3:4 비율 맞추고 싶으면 나중에 조정
                }}
            >
                <CardMedia
                    component="img"
                    image={cover.url}
                    alt="Selected book cover"
                    sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Card>
        </Box>
    );
}