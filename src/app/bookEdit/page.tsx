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
import Box from "@mui/material/Box";
import MainPreviewCover from "@/app/bookEdit/components/covers/MainPreviewCover";
import type {CoverImage} from "@/types/cover";
import { Book, BookEditLog } from "@/types/book";
import WritingAreaActions from "./components/WritingAreaButtons";
import { useSearchParams } from "next/navigation";
import TopBar from "./components/TopBar";
import { useState, useEffect } from "react";
import { useFetchBook } from "@/hooks/mutations/update/useFetchBook"; // ⬅ GET 훅 import
import { useUpdateBook } from "@/hooks/mutations/update/useUpdateBook";



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
    const bookCdParam = searchParams.get("bookCd"); // 문자열 또는 null
    const BookCd = bookCdParam ?? "";

    // 수정 로그
    const [editLogs, setEditLogs] = useState<BookEditLog[]>([]);
    // GET 훅 사용
    // app/bookEdit/page.tsx

    const {
        data: fetchedBook,
        isLoading,
        error,
    } = useFetchBook(bookCdParam);

    useEffect(() => {
        if (!fetchedBook) return;

        console.log("📥 fetchedBook (mapped):", fetchedBook);

        // ✅ Book 타입 기준 필드 사용
        setTitle(fetchedBook.title ?? "");
        setGenre(fetchedBook.genre ?? "판타지");
        setSummary(fetchedBook.summary ?? "");
        setContent(fetchedBook.content ?? "");

        if (fetchedBook.mainCover) {
            setSelectedCover(fetchedBook.mainCover);
        }
        if (fetchedBook.covers) {
            setCoverList(fetchedBook.covers);
        }
    }, [fetchedBook]);

    const updateBookMutation = useUpdateBook();

    //현재 폼 상태를 로그로 남기는 함수
    const pushSnapshotLog = () => {
        if (!BookCd) return;

        const log: BookEditLog = {
            id: String(Date.now()),
            bookId: BookCd,
            title,
            genre,
            summary,
            content,
            imageUrl: selectedCover ? selectedCover.url : null,
            changedAt: new Date().toISOString(),
        };

        setEditLogs((prev) => [...prev, log]);
    };

    const handlePreviewPayload = () => {
        if (!fetchedBook) {
            console.error("❌ No fetchedBook, cannot save.");
            return;
        }

        if (!selectedCover) {
            console.error("❌ No selected cover. Please select a main cover before saving.");
            alert("메인 표지 이미지를 하나 선택해 주세요.");
            return;
        }

        const payload = {
            userCd: fetchedBook.userCd ?? "U0001",        // 백엔드 응답 기준으로 매핑
            userNickNm: fetchedBook.userNickNm ?? "",
            bookCd: fetchedBook.id,                      // "B0007"
            bookNm: title,                               // 수정된 제목
            bookSummaryDc: summary,
            bookContentDc: content,
            bookGenreFg: genre,
            coverFileEn: selectedCover.url,              // ✅ 오직 메인 프리뷰 URL만 전송
            coverCd: selectedCover.id,                   // ✅ 선택된 표지의 id
        };

        console.log("📦 PUT payload ready:", payload);

        updateBookMutation.mutate(payload, {
            onSuccess: (data) => {
                console.log("✅ Book updated successfully:", data);
                alert("저장되었습니다!");
            },
            onError: (error: any) => {
                console.error("❌ Failed to update book:", error?.response?.data || error);
                alert("저장 중 오류가 발생했습니다. 콘솔을 확인해 주세요.");
            },
        });
    };



    return (
        <>
            <TopBar/>
            <Container maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
                {isLoading && (
                    <Typography sx={{ mb: 2 }}>Loading book data...</Typography>
                )}
                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        Failed to load book data.
                    </Typography>
                )}
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
                            initialCandidates={coverList}
                        />
                    </Box>
                </Stack>
            </Container>

        </>
    );
}
