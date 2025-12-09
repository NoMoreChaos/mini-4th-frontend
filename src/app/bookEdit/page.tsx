// app/bookEdit/page.txs
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
import { Book, BookEditLog } from "@/types/book";
import WritingAreaActions from "./components/WritingAreaButtons";
import { useSearchParams } from "next/navigation";
import TopBar from "./components/TopBar";


export default function BookEditPage() {
    // text field
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("Fantasy");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    // Main Preview 썸네일 cover state
    const [selectedCover, setSelectedCover] = useState<CoverImage | null>(null);
    const [coverList, setCoverList] = useState<CoverImage[]>([]);

    // bookId query Param 불러오기
    const searchParams = useSearchParams();
    const bookIdParam = searchParams.get("bookId"); // 문자열 또는 null
    const numericBookId = bookIdParam ? Number(bookIdParam) : NaN;

    // 서버에서 불러올 책 전체
    const [book, setBook] = useState<Book | null>(null);
    // 수정 로그
    const [editLogs, setEditLogs] = useState<BookEditLog[]>([]);

    //현재 폼 상태를 로그로 남기는 함수
    const pushSnapshotLog = () => {
        if (!numericBookId) return;

        const log: BookEditLog = {
            id: Date.now(),
            bookId: numericBookId,
            title,
            genre,
            summary,
            content,
            imageUrl: selectedCover ? selectedCover.url : null,
            changedAt: new Date().toISOString(),
        };

        setEditLogs((prev) => [...prev, log]);
    };

    // JSON 미리보기 함수 _ 콘솔 확인
    const handlePreviewPayload = () => {
        // 1) 현재 상태를 스냅샷 로그로 추가
        pushSnapshotLog();

        // 2) 서버에 실제로 보낼 메인 payload (로그와 분리해도 OK)
        const payload = {
            bookId: numericBookId,
            title,
            genre,
            summary,
            content,
            mainCoverUrl: selectedCover ? selectedCover.url : null,
            // 필요하다면 로그 전체도 같이 보낼 수 있음
            logs: editLogs, // pushSnapshotLog 직후의 최신 로그까지 포함하고 싶으면 여기서 조정 가능
        };

        console.log("백엔드에 보낼 예정 JSON:", payload);
    };


    return (
        <>
            <TopBar/>
            <Container maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
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
                    <Box sx={{ width: { xs: "100%", md: "60%" } }}>
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
                                <WritingAreaActions
                                    onSave={handlePreviewPayload} // 지금은 JSON 미리보기
                                />
                            </CardContent>
                        </Card>
                    </Box>

                    {/* RIGHT: AI Cover Panel */}
                    <Box sx={{ width: { xs: "100%", md: "40%" } }}>
                        <CoverGenerate
                            onSelectCover={setSelectedCover}
                            title={title}
                            summary={summary}
                            content={content}
                            genre={genre}
                        />
                    </Box>
                </Stack>
            </Container>

        </>
    );
}
