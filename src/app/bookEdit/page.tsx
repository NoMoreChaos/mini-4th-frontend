// app/bookEdit/page.tsx
"use client";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GenreChoice from "./components/genreChoice";
import Summary from "./components/SummaryField";
import Content from"./components/ContentField";
import CoverGenerate from "./components/cover_generate";
import {useState} from "react";
import Box from "@mui/material/Box";
import MainPreviewCover from "@/app/bookEdit/components/covers/MainPreviewCover";
import type {CoverImage} from "@/types/cover";
import WritingAreaActions from "./components/WritingAreaButtons";

export default function BookEditPage() {
    // genre state
    const [genre, setGenre] = useState("Fantasy");
    // summary state
    const [summary, setSummary] = useState("");
    // content writing state
    const [content, setContent] = useState("");
    // title state (추가해두면 나중에 API 연동할 때 편함)
    const [title, setTitle] = useState("");
    // Main Preview 썸네일 cover state
    const [selectedCover, setSelectedCover] = useState<CoverImage | null>(null);

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/*
        좌우 2단 레이아웃
        - xs: 세로(column)로 쌓이고
        - md 이상: 가로(row)로 나란히
      */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={3}
                alignItems="flex-start"
            >
                {/* LEFT: Writing Area (대략 70%) */}
                <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h5" fontWeight={600} gutterBottom>
                                ✎ Writing Area
                            </Typography>
                            {/* 1. 대표 이미지 미리보기 (지금은 항상 placeholder만 뜸) */}
                            <MainPreviewCover cover={selectedCover} />

                            <Stack spacing={2} mt={2}>
                                {/* Title */}
                                <Box>
                                    <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                                        Title
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Enter a book title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        inputProps={{ maxLength: 50 }}
                                    />
                                </Box>

                                {/* Genre selector */}
                                <GenreChoice value={genre} onChange={setGenre} />

                                {/* Summary field */}
                                <Summary
                                    value={summary}
                                    onChange={setSummary}
                                    placeholder="Enter a short summary of your story (max 500 chars)"
                                    maxLength={500}
                                />

                                {/* Content writing field */}
                                <Content
                                    value={content}
                                    onChange={setContent}
                                    placeholder="Write the full story content here..."
                                    maxLength={5000}
                                />
                            </Stack>

                            {/*저장 취소 버튼*/}
                            <WritingAreaActions/>
                        </CardContent>
                    </Card>
                </Box>

                {/* RIGHT: AI Cover Panel */}
                <Box sx={{ width: { xs: "100%", md: "30%" } }}>
                    <CoverGenerate onSelectCover={setSelectedCover} />
                </Box>
            </Stack>
        </Container>
    );
}
