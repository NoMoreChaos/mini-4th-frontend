//src/components/covers/CoverCandidateList.tsx

"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import {CoverImage} from "@/types/cover";


interface CoverCandidateListProps {
    candidates: CoverImage[];
    selectedId?: string | null;
    onSelect?: (id: string) => void; // 선택 이벤트 (지금은 optional)
}

export default function CoverCandidateList({
    candidates,
    selectedId,
    onSelect,} : CoverCandidateListProps){
    return (
        <Box mt={2}>
            <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 1 }}
            >
                Cover Candidates
            </Typography>

            {/* 리스트 자체를 좌우 스크롤 가능하게 */}
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    overflowX: "auto",
                    pb: 1,
                }}
            >
                {candidates.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                        No cover image is created yet.
                    </Typography>
                )}

                {candidates.map((item) => {
                    const isSelected = item.id === selectedId;

                    return (
                        <Card
                            key={item.id}
                            onClick={() => onSelect?.(item.id)}
                            sx={{
                                minWidth: 100,
                                maxWidth: 100,
                                height: 140,
                                borderRadius: 2,
                                cursor: "pointer",
                                overflow: "hidden",
                                border: isSelected ? "3px solid #1976d2" : "1px solid #ccc",
                                boxShadow:
                                    selectedId === item.id
                                        ? "0 0 10px rgba(25, 118, 210, 0.6)" // 선택 시 파란 빛 그림자
                                        : "none",
                                transition: "0.2s",
                                "&:hover": {
                                    boxShadow: 3,
                                    transform: "scale(1.03)",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={item.url}
                                alt="candidate cover"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
}
