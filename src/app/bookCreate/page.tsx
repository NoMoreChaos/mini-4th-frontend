"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    MenuItem,
    LinearProgress,
    Box,
} from "@mui/material";

// --------------------------------------------------
// 설정 값들
// --------------------------------------------------
const GENRES = [
    "판타지",
    "로맨스",
    "SF",
    "미스터리",
    "스릴러",
    "에세이",
    "자기계발",
    "역사",
    "철학",
    "동화",
    "기타",
];

const MAX_TITLE = 50;
const MAX_SUMMARY = 500;
const MAX_CONTENT = 2000;
const MAX_PROMPT = 1000;

export default function BookCoverPage() {

    const router = useRouter();
    const [userCd, setUserCd] = useState<string | null>(null);

    // --------------------------------------------------
    // 페이지 보호(로그인 없으면 접근 불가)
    // --------------------------------------------------
    useEffect(() => {
        const userCd = localStorage.getItem("userCd");

        if (!userCd) {
            router.replace("/login");
        } else {
            setUserCd(userCd);
        }
    }, [router]);

    // --------------------------------------------------
    // 입력값 상태 관리
    // --------------------------------------------------
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [promptDetail, setPromptDetail] = useState("");

    // --------------------------------------------------
    // 표지 이미지 3개 저장 (1번=대표)
    // 생성 시 → 새 이미지가 앞에 들어오고, 기존 1→2→3으로 밀림
    // --------------------------------------------------
    const [covers, setCovers] = useState<(string | null)[]>([null, null, null]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    //const [errorMsg, setErrorMsg] = useState<string | null>(null);
    //const hasAnyCover = covers.some((c) => c !== null);

    // --------------------------------------------------
    // AI 이미지 생성하기
    // --------------------------------------------------
    const handleGenerate = async () => {
        //setErrorMsg(null);

        if (!title || !genre || !summary || !content) {
            alert("도서 명, 장르, 작품 소개, 내용을 모두 입력해주세요.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/bookCreate/api/generate-cover", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    genre,
                    summary,
                    content,
                    promptDetail,
                }),
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                const message = errBody?.error?.message || "이미지 생성 실패";
                alert(message);
                return;
            }

            const data = await res.json().catch(() => null);
            const newUrl = data?.url;

            if (!newUrl) {
                alert("이미지 URL 없음");
                return;
            }

            // 새 이미지 앞에 추가 → 오래된 것은 자동 제거 (3개 유지)
            setCovers((prev) => [newUrl, prev[0], prev[1]].slice(0, 3));
        } catch (err: unknown) {
            if (err instanceof Error) {alert(err.message || "이미지 생성 오류");}
            else {alert("이미지 생성 오류");}
        } finally {
            setLoading(false);
        }
    };

    // --------------------------------------------------
    // 2번/3번 클릭 → 대표 이미지(1번)와 교체
    // --------------------------------------------------
    const swapWithFirst = (index: number) => {
        if (index === 0) return;

        setCovers((prev) => {
            const next = [...prev];
            [next[0], next[index]] = [next[index], next[0]];
            return next;
        });
    };

    // --------------------------------------------------
    // 작품 등록
    // --------------------------------------------------
    const handleRegister = async () => {
        //setErrorMsg(null);

        if (!covers[0]) {
            alert("첫 번째 대표 표지를 생성해야 등록 가능합니다.");
            return;
        }
        if (!userCd) {
            alert("로그인 정보가 없어 로그인 화면으로 이동합니다.");
            router.replace("/login");
            return;
        }

        try {
            setSaving(true);

            const bookData = {
                userCd: userCd,
                bookNm: title,
                bookSummaryDc: summary,
                bookContentDc: content,
                bookGenreFg: genre,
                coverPromptDc: promptDetail,
                coverCd: null,
                coverFileEn: covers[0], // 대표 이미지
            };

            const res = await fetch("/bookCreate/api/generate-book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookData),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                const message = data?.error || "작품 등록 실패";
                alert(message);
                return;
            }

            alert("작품 등록 완료!");
            // 목록 페이지로 이동
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) {alert(err.message || "이미지 생성 오류");}
            else {alert("이미지 생성 오류");}
        } finally {
            setSaving(false);
        }
    };

    // --------------------------------------------------
    // 화면 UI 시작
    // --------------------------------------------------
    return (
        <main className="h-screen bg-slate-100 flex flex-col">
            <div className="flex-1 flex flex-col px-4 py-4 overflow-hidden">

                {/* 🔹 홈 버튼 */}
                <div className="mb-3 flex-none">
                    <Button
                        variant="text"
                        onClick={() => (window.location.href = "/")}
                        sx={{ textTransform: "none", fontWeight: 600, color: "black" }}
                    >
                        ↩︎ 홈
                    </Button>
                </div>

                <div className="w-full flex flex-col md:flex-row gap-6 flex-1 overflow-hidden">
                    {/* --------------------------------------------------
                    왼쪽: 표지 미리보기 1,2,3
                    -------------------------------------------------- */}
                    <div className="md:w-3/5 lg:w-2/3 h-full">
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4,
                                height: "100%",
                                background: "lightgray",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {loading && (
                                <div className="absolute left-0 right-0 top-0 z-10">
                                    <LinearProgress />
                                </div>
                            )}

                            <CardContent className="p-4 md:p-5 flex flex-col h-full">
                                <Typography variant="subtitle1" fontWeight="bold" className="mb-3">
                                    표지 미리보기 👀
                                </Typography>

                                <div className="flex gap-3 flex-1 min-h-0">

                                    {/* 1번 표지 → 클릭하면 새창으로 보기 */}
                                    <div className="flex-[2] flex min-h-0 ">
                                        <div
                                            className={`
                                                flex flex-col border-2 rounded-xl overflow-hidden bg-white
                                                cursor-pointer transition-all duration-150
                                                border-indigo-500 ring-2 ring-indigo-300
                                                w-full h-full 
                                              `}
                                            onClick={() => {
                                                if (covers[0]) window.open(covers[0]!, "_blank");
                                            }}
                                        >
                                            <div className="flex-1 flex items-center justify-center bg-slate-50">
                                                <div className="w-full h-full flex items-center justify-center relative">
                                                    {covers[0] ? (
                                                        <Image
                                                            src={covers[0]}
                                                            alt="1번 대표 표지"
                                                            fill
                                                            sizes="100vw"
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="text-slate-300 text-2xl text-center p-3">
                                                            <b>[1번 대표 표지]</b>
                                                            <p>당신의 책을 위한 멋진 표지를 AI가 대신 그려드릴게요!</p>
                                                            <p>제목과 소개를 적고 <b>‘AI 표지 제작하기’</b>를 눌러보세요.</p>
                                                            <p>새 표지는 1번 자리에 쏙 들어오고, 예전 표지는 옆으로 이동합니다.</p>
                                                            <p>마음에 드는 표지는 클릭해서 대표 표지로 바꿔보세요!</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="px-3 py-1 text-xm text-slate-500 flex justify-between">
                                                {covers[0] && (
                                                    <span className="text-indigo-500 font-medium">
                                                        ☝️대표 이미지를 클릭하여 크게 확인해 보세요
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2번 + 3번 표지 */}
                                    <div className="flex-[1] flex flex-col gap-3 min-h-0 ">
                                        {[1, 2].map((idx) => (
                                            <div key={idx} className="flex-1 flex min-h-0">
                                                <div
                                                    className={`
                                                    flex flex-col border-2 rounded-xl overflow-hidden bg-white
                                                    cursor-pointer transition-all
                                                    border-slate-400 hover:border-indigo-400 hover:ring-2 hover:ring-indigo-200
                                                    w-full h-full
                                                  `}
                                                    onClick={() => {
                                                        if(covers[idx]) swapWithFirst(idx)
                                                    }}
                                                >
                                                    <div className="flex-1 flex items-center justify-center bg-slate-50">
                                                        <div className="w-full h-full flex items-center justify-center relative">
                                                            {covers[idx] ? (
                                                                <Image
                                                                    src={covers[idx] as string}
                                                                    alt={`${idx + 1}번 표지`}
                                                                    fill
                                                                    sizes="100vw"
                                                                    className="object-cover"
                                                                    unoptimized
                                                                />
                                                            ) : (
                                                                <div className="text-slate-300 text-xl text-center m-5">
                                                                    <p><b>[{idx + 1}번 표지]</b></p>
                                                                    <p>생성된 이미지가 없습니다.</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* --------------------------------------------------
                    오른쪽: 입력 폼 + 버튼
                    -------------------------------------------------- */}
                    <div className="md:w-2/5 lg:w-1/3 flex flex-col h-full">
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 4,
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* 제목 고정 */}
                            <div
                                className="px-4 border-b border-slate-200 bg-white flex items-center"
                                style={{ height: "64px" }}
                            >
                                <Typography variant="h5" fontWeight="bold">
                                    📘 도서 기획안 작성
                                </Typography>
                            </div>

                            {/* 스크롤되는 입력폼 */}
                            <CardContent
                                className="p-4 md:p-5"
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    flex: 1,
                                    overflowY: "auto",
                                }}
                            >
                                {/* 도서명 */}
                                <div>
                                    <Typography variant="subtitle2" gutterBottom>도서명 *</Typography>
                                    <Box sx={{ position: "relative" }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            value={title}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setTitle(value.slice(0, MAX_TITLE));
                                            }}
                                            placeholder="내용의 핵심을 짧고 인상적으로 표현하는 제목을 입력하세요."
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                bottom: 6,
                                                fontSize: "0.7rem",
                                                color: "text.disabled",
                                            }}
                                        >
                                            {title.length}/{MAX_TITLE}
                                        </Typography>
                                    </Box>
                                </div>

                                {/* 장르 */}
                                <div>
                                    <Typography variant="subtitle2" gutterBottom>장르 *</Typography>
                                    <TextField
                                        select
                                        fullWidth
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        slotProps={{
                                            select: { displayEmpty: true }
                                        }}
                                    >
                                        <MenuItem value="" disabled>장르를 선택하세요</MenuItem>
                                        {GENRES.map((g) => (
                                            <MenuItem key={g} value={g}>{g}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                {/* 요약 */}
                                <div>
                                    <Typography variant="subtitle2" gutterBottom>작품 소개(요약) *</Typography>
                                    <Box sx={{ position: "relative" }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={2}
                                            value={summary}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSummary(value.slice(0, MAX_SUMMARY));
                                            }}
                                            placeholder="이 책이 어떤 이야기인지, 어떤 느낌을 주는지 간략하게 소개해 주세요"
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                bottom: 6,
                                                fontSize: "0.7rem",
                                                color: "text.disabled",
                                            }}
                                        >
                                            {summary.length}/{MAX_SUMMARY}
                                        </Typography>
                                    </Box>
                                </div>

                                {/* 내용 */}
                                <div>
                                    <Typography variant="subtitle2" gutterBottom>내용 (줄거리 / 설명) *</Typography>
                                    <Box sx={{ position: "relative" }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={3}
                                            value={content}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setContent(value.slice(0, MAX_CONTENT));
                                            }}
                                            placeholder= {"책의 주요 줄거리, 등장인물, 배경 등을 자유롭게 설명해주세요.\n" +
                                                "표지에 담고 싶은 분위기나 장면이 있다면 함께 적어주면 더 좋아요."}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                bottom: 6,
                                                fontSize: "0.7rem",
                                                color: "text.disabled",
                                            }}
                                        >
                                            {content.length}/{MAX_CONTENT}
                                        </Typography>
                                    </Box>
                                </div>

                                {/* 프롬프트 */}
                                <div>
                                    <Typography variant="subtitle2" gutterBottom>프롬프트 (디자인 요청)</Typography>
                                    <Box sx={{ position: "relative" }}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={5}
                                            value={promptDetail}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setPromptDetail(value.slice(0, MAX_PROMPT));   // 🔥 1000자 제한
                                            }}
                                            placeholder={
                                                "- 표지의 원하는 디자인 방향이 있다면 구체적으로 설명해 주세요.\n" +
                                                "- 원하는 일러스트 스타일, 색감, 시대적 배경 등을 자세히 적을수록 더 정확한 표지가 생성됩니다.\n" +
                                                "- 예: 따뜻한 파스텔 톤, 미니멀한 구성, 몽환적 일러스트 등"}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                position: "absolute",
                                                right: 8,
                                                bottom: 6,
                                                fontSize: "0.7rem",
                                                color: "text.disabled",
                                            }}
                                        >
                                            {promptDetail.length}/{MAX_PROMPT}
                                        </Typography>
                                    </Box>
                                </div>

                                {/*{errorMsg && (*/}
                                {/*    <Typography color="error" variant="body2">*/}
                                {/*        {errorMsg}*/}
                                {/*    </Typography>*/}
                                {/*)}*/}
                            </CardContent>

                            {/* 버튼 영역 */}
                            <div className="px-4 pb-4 pt-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row gap-2">
                                <Button
                                    onClick={handleGenerate}
                                    disabled={loading || saving}
                                    fullWidth
                                    sx={{
                                        borderRadius: "999px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        py: 1.2,
                                        color: "white",
                                        background:
                                            "linear-gradient(135deg, #6366f1, #ec4899, #f97316)",
                                    }}
                                >
                                    {loading ? "AI 생성 중..." : "✨ AI 표지 제작하기"}
                                </Button>

                                <Button
                                    variant="outlined"
                                    fullWidth
                                    disabled={!covers[0] || saving}
                                    onClick={handleRegister}
                                    sx={{
                                        borderRadius: "999px",
                                        textTransform: "none",
                                        fontWeight: 600,
                                        py: 1.2,
                                    }}
                                >
                                    📚 작품 등록
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

            </div>
        </main>
    );
}