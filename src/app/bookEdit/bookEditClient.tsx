// app/bookEdit/BookEditClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import GenreChoice from "./components/genreChoice";
import Summary from "./components/SummaryField";
import Content from "./components/ContentField";
import CoverGenerate from "./components/cover_generate";
import MainPreviewCover from "./components/covers/MainPreviewCover";
import WritingAreaActions from "./components/WritingAreaButtons";
import TopBar from "./components/TopBar";

import type { CoverImage } from "@/types/cover";
import type { BookEditLog } from "@/types/book";

import { useFetchBook } from "@/hooks/mutations/update/useFetchBook";
import { useUpdateBook } from "@/hooks/mutations/update/useUpdateBook";

export default function BookEditClient() {
    // -----------------------------
    // Query Param
    // -----------------------------
    const searchParams = useSearchParams();
    const bookCd = searchParams.get("bookCd") ?? "";

    // -----------------------------
    // Form state
    // -----------------------------
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("Fantasy");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    // -----------------------------
    // Cover state
    // -----------------------------
    const [selectedCover, setSelectedCover] = useState<CoverImage | null>(null);
    const [coverList, setCoverList] = useState<CoverImage[]>([]);

    // -----------------------------
    // Logs
    // -----------------------------
    const [editLogs, setEditLogs] = useState<BookEditLog[]>([]);
    const [initialized, setInitialized] = useState(false);

    // -----------------------------
    // GET book
    // -----------------------------
    const {
        data: fetchedBook,
        isLoading,
        error,
    } = useFetchBook(bookCd);

    // 초기 데이터 → 폼 세팅 (1회만)
    useEffect(() => {
        if (!fetchedBook || initialized) return;

        console.log("📥 fetchedBook:", fetchedBook);

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

        setInitialized(true);
    }, [fetchedBook, initialized]);

    // -----------------------------
    // PUT mutation
    // -----------------------------
    const updateBookMutation = useUpdateBook();

    const pushSnapshotLog = () => {
        if (!bookCd) return;

        const log: BookEditLog = {
            id: String(Date.now()),
            bookId: bookCd,
            title,
            genre,
            summary,
            content,
            imageUrl: selectedCover?.url ?? null,
            changedAt: new Date().toISOString(),
        };

        setEditLogs((prev) => [...prev, log]);
    };

    const handleSave = () => {
        if (!fetchedBook || !selectedCover) {
            alert("책 정보 또는 메인 표지가 없습니다.");
            return;
        }

        pushSnapshotLog();

        const payload = {
            userCd: fetchedBook.userCd ?? "",
            userNickNm: fetchedBook.userNickNm ?? "",
            bookCd,
            bookNm: title,
            bookSummaryDc: summary,
            bookContentDc: content,
            bookGenreFg: genre,
            coverFileEn: selectedCover.url,
            coverCd: selectedCover.id,
        };

        console.log("📦 PUT payload:", payload);

        updateBookMutation.mutate(payload, {
            onSuccess: () => {
                alert("저장되었습니다.");
            },
            onError: (err: unknown) => {
                console.error("❌ update error:", err);
                alert("저장 중 오류가 발생했습니다.");
            },
        });
    };

    // -----------------------------
    // UI
    // -----------------------------
    return (
        <>
            <TopBar />

            <Container maxWidth="lg" sx={{ pt: 3, pb: 6 }}>
                {isLoading && <Typography>Loading book data...</Typography>}
                {error && (
                    <Typography color="error">
                        Failed to load book data.
                    </Typography>
                )}

                <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    alignItems="flex-start"
                >
                    {/* LEFT */}
                    <Box sx={{ width: { xs: "100%", md: "60%" } }}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" fontWeight={600}>
                                    ✎ Writing Area
                                </Typography>

                                <MainPreviewCover cover={selectedCover} />

                                <Stack spacing={2} mt={2}>
                                    <TextField
                                        fullWidth
                                        label="Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    <GenreChoice value={genre} onChange={setGenre} />

                                    <Summary
                                        value={summary}
                                        onChange={setSummary}
                                    />

                                    <Content
                                        value={content}
                                        onChange={setContent}
                                    />
                                </Stack>

                                <WritingAreaActions onSave={handleSave} />
                            </CardContent>
                        </Card>
                    </Box>

                    {/* RIGHT */}
                    <Box sx={{ width: { xs: "100%", md: "40%" } }}>
                        <CoverGenerate
                            title={title}
                            summary={summary}
                            content={content}
                            genre={genre}
                            initialCandidates={coverList}
                            onSelectCover={setSelectedCover}
                        />
                    </Box>
                </Stack>
            </Container>
        </>
    );
}
