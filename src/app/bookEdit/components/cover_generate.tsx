// src/components/books/CoverGenerate.tsx
"use client";
// Next.js App Router에서는 컴포넌트에 클라이언트 기능(useState 등)을 쓰려면 필요함.

import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

/**
 * Request Log 한 줄을 표현하는 타입 정의
 * (UI 테스트용 데이터 구조)
 */
interface RequestLogItem {
    id: number;
    prompt: string;
    status: "Success" | "Error";
    timeSec: number;
}

export default function CoverGenerate() {
    /**
     * 사용자가 입력하는 프롬프트
     */
    const [prompt, setPrompt] = useState("");

    /**
     * Request Log 목록 (UI용 더미 데이터)
     * 나중에 실제 API 호출 데이터를 넣으면 교체됨
     */
    const [logs, setLogs] = useState<RequestLogItem[]>([
        {
            id: 1,
            prompt: "Cherry blossom...",
            status: "Success",
            timeSec: 1.8,
        },
        {
            id: 2,
            prompt: "Minimalist design...",
            status: "Success",
            timeSec: 2.1,
        },
        {
            id: 3,
            prompt: "Dark fantasy...",
            status: "Success",
            timeSec: 1.9,
        },
    ]);

    /**
     * "Generate Cover" 버튼 클릭 시 실행되는 함수
     * 현재는 API가 없기 때문에 단순히 로그만 추가하는 역할
     */
    const handleGenerate = () => {
        // 입력이 비어있으면 무시
        if (!prompt.trim()) return;

        // UI 테스트용: 임의의 성공 로그 생성
        const newItem: RequestLogItem = {
            id: Date.now(), // 유니크한 ID
            prompt,
            status: "Success",
            timeSec: Number((1.5 + Math.random()).toFixed(1)),
        };

        // 기존 logs 배열의 맨 앞에 새 로그 추가
        setLogs((prev) => [newItem, ...prev]);

        // 입력창 초기화
        setPrompt("");
    };

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3, // 둥근 모서리
                p: 3,            // padding
            }}
        >
            {/* 제목 */}
            <Typography variant="h6" fontWeight={600} gutterBottom>
                AI Cover Generation
            </Typography>

            <Stack spacing={2} mt={1}>
                {/* Prompt Label + Input Field */}
                <Box>
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mb: 0.5 }}
                    >
                        Prompt for AI
                    </Typography>

                    {/* 프롬프트 입력창 */}
                    <TextField
                        fullWidth
                        placeholder="e.g., Dark fantasy with mystical elements"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        inputProps={{ maxLength: 200 }} // 최대 200자
                    />
                </Box>

                {/* Generate Cover 버튼 */}
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleGenerate}
                    sx={{
                        mt: 1,
                        py: 1.2,
                        fontWeight: 500,
                        backgroundColor: "black",
                        "&:hover": { backgroundColor: "#333" },
                    }}
                >
                    Generate Cover
                </Button>

                {/* Request Log 영역 */}
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
                            maxHeight: 180,    // 최대 높이 (스크롤 발생)
                            overflowY: "auto", // 스크롤 가능
                        }}
                    >
                        {/* logs 배열을 화면에 출력 */}
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

                        {/* 로그가 없는 경우 */}
                        {logs.length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                No requests yet. Try generating a cover!
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Stack>
        </Paper>
    );
}
