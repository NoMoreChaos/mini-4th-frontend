// src/components/books/CoverGenerate.tsx
"use client";

import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import CoverCandidateList from "@/app/bookEdit/components/covers/CandidateCoverList";
import { CoverImage } from "@/types/cover";
import { useGenerateImageMutation } from "@/hooks/mutations/generate-image/generateImage";

interface RequestLogItem {
    id: string; // ✅ string으로 사용
    prompt: string;
    status: "Success" | "Error" | "Pending";
    timeSec: number;
}

interface CoverGenerateProps {
    onSelectCover?: (cover: CoverImage) => void;
    title: string;
    summary: string;
    content: string;
    genre: string;
    initialCandidates?: CoverImage[];
}

export default function CoverGenerate({
                                          onSelectCover,
                                          title,
                                          summary,
                                          content,
                                          genre,
    initialCandidates,
                                      }: CoverGenerateProps) {
    const [prompt, setPrompt] = useState("");
    const [logs, setLogs] = useState<RequestLogItem[]>([]);

    const defaultDummy: CoverImage[] = [
        {
            id: "dummy-1",
            url: "https://images.unsplash.com/photo-1526045478516-99145907023c",
            prompt: ""
        },
        {
            id: "dummy-2",
            url: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
            prompt: ""
        },
        {
            id: "dummy-3",
            url: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
            prompt: ""
        },
    ];

// 초기 렌더 시점 candidates
    const [candidates, setCandidates] = useState<CoverImage[]>(() => {
        if (initialCandidates && initialCandidates.length > 0) {
            return initialCandidates;
        }
        return defaultDummy;
    });

// 나중에 initialCandidates가 바뀌는 경우도 반영하고 싶으면:
    useEffect(() => {
        if (!initialCandidates || initialCandidates.length === 0) return;

        setCandidates((prev) => {
            // 필요하면 여기서 중복 제거 로직도 추가 가능
            return initialCandidates;
        });
    }, [initialCandidates]);


    const [selectedId, setSelectedId] = useState<string | null>(null);

    const { mutateAsync, isPending } = useGenerateImageMutation();

    /**
     * AI 이미지 생성 버튼 클릭
     */
    const handleGenerate = async () => {
        if (!prompt.trim()) return;

        // ✅ id를 처음부터 string으로 생성
        const tempId = String(Date.now());
        const start = performance.now();

        // 1) 기본 세팅 프롬프트 (역할/스타일 정의)
        const basePrompt = `
You are a professional book cover designer.
Create a visually striking book cover in a modern illustration style.
Avoid text on the cover. Focus on imagery, color, and composition.
        `.trim();

        // 2) 책 정보 정리
        //    ✅ 요약이 있으면 summary 사용, 없으면 content 일부 사용
        const storySummary =
            summary && summary.trim().length > 0
                ? summary.trim()
                : (content && content.trim().length > 0
                    ? content.slice(0, 300)
                    : "No additional description.");

        const bookContext = `
Book title: "${title || "Untitled"}"
Genre: ${genre || "Unknown"}
Story summary: ${storySummary}
        `.trim();

        // 3) 사용자가 prompt 입력창에 쓴 값 (디자인 디테일)
        const userDesignPrompt = prompt.trim()
            ? `Design details from user: ${prompt.trim()}`
            : `Design details: Use a composition that fits the genre and mood of the story.`;

        // 4) 최종 프롬프트 합치기
        const combinedPrompt = `
${basePrompt}

${bookContext}

${userDesignPrompt}
        `.trim();
        console.log("📌 Combined Prompt Sent to AI:", combinedPrompt);

        // 로그: Pending 추가 (✅ id를 string으로 일관되게 사용)
        setLogs((prev) => [
            {
                id: tempId,
                prompt: combinedPrompt,
                status: "Pending",
                timeSec: 0,
            },
            ...prev,
        ]);

        try {
            const result = await mutateAsync({ prompt: combinedPrompt });
            const end = performance.now();
            const elapsed = Number(((end - start) / 1000).toFixed(1));

            if (!result.imageUrl) {
                // 실패 로그 업데이트
                setLogs((prev) =>
                    prev.map((item) =>
                        item.id === tempId
                            ? { ...item, status: "Error", timeSec: elapsed }
                            : item
                    )
                );
                return;
            }

            // 새 CoverImage 생성 (✅ id도 string으로 유지)
            const newCover: CoverImage = {
                id: tempId,
                url: result.imageUrl,
                prompt: combinedPrompt,
            };

            // 후보 리스트에 추가
            setCandidates((prev) => [newCover, ...prev]);

            // 메인 프리뷰에 자동 선택
            setSelectedId(tempId);
            onSelectCover?.(newCover);

            // 성공 로그 업데이트
            setLogs((prev) =>
                prev.map((item) =>
                    item.id === tempId
                        ? { ...item, status: "Success", timeSec: elapsed }
                        : item
                )
            );
        } catch (err) {
            const end = performance.now();
            const elapsed = Number(((end - start) / 1000).toFixed(1));

            setLogs((prev) =>
                prev.map((item) =>
                    item.id === tempId
                        ? { ...item, status: "Error", timeSec: elapsed }
                        : item
                )
            );
        } finally {
            setPrompt("");
        }
    };

    /**
     * 후보 썸네일 클릭 시 선택 처리
     */
    const handleSelectCandidate = (id: string) => {
        setSelectedId(id);
        const cover = candidates.find((c) => c.id === id);
        if (cover && onSelectCover) {
            onSelectCover(cover);
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
                p: 3,
                minHeight: 620,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h6" fontWeight={600} gutterBottom>
                AI Cover Generation
            </Typography>

            <Stack spacing={2} mt={1}>
                <Box>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        Prompt for AI
                    </Typography>

                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        maxRows={6}
                        placeholder="e.g., Dark fantasy with mystical elements"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        inputProps={{ maxLength: 200 }}
                    />
                </Box>

                <Button
                    variant="contained"
                    fullWidth
                    disabled={isPending}
                    onClick={handleGenerate}
                    sx={{
                        mt: 1,
                        py: 1.2,
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        backgroundColor: "black",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    {isPending ? "Generating..." : "Generate Cover"}
                </Button>

                {/* Request Log */}
                <Box mt={2}>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        Request Log:
                    </Typography>

                    <Box
                        sx={{
                            borderRadius: 2,
                            backgroundColor: "#f5f5f5",
                            px: 2,
                            py: 1.5,
                            maxHeight: 180,
                            overflowY: "auto",
                        }}
                    >
                        {logs.map((item) => (
                            <Typography
                                key={item.id}
                                variant="body2"
                                sx={{ mb: 0.5 }}
                            >
                                Prompt: {item.prompt} | Status: {item.status} | Time:{" "}
                                {item.timeSec}s
                            </Typography>
                        ))}

                        {logs.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                No requests yet. Try generating a cover!
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* 후보 이미지 리스트 */}
                <CoverCandidateList
                    candidates={candidates}
                    selectedId={selectedId}
                    onSelect={handleSelectCandidate}
                />
            </Stack>
        </Paper>
    );
}
