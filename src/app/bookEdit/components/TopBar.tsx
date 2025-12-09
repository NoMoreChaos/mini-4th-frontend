// app/bookEdit/components/EditTopBar.tsx
"use client";

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";

export default function EditTopBar() {
    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                bgcolor: "#ffffff",
                color: "black",
                borderBottom: "1px solid #e0e0e0",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                "& .MuiToolbar-root": {
                    minHeight: 90,        // 여기 숫자를 크게 하면 TopBar 자체 높이가 확 달라짐
                    // 혹은 height: 96 로도 테스트해봐도 됨
                },
            }}
        >
            <Toolbar
                sx={{
                    maxWidth: "lg",
                    mx: "auto",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 2, md: 0 },
                }}
            >
                {/* 왼쪽: 로고 + 텍스트 (홈으로 이동) */}
                <Box
                    component={Link}
                    href="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        textDecoration: "none",
                        color: "inherit",
                        cursor: "pointer",
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 600,
                            letterSpacing: "0.03em",
                        }}
                    >
                        <AutoStoriesOutlinedIcon sx={{mr: 0.8}}/> Walking Library
                    </Typography>
                </Box>

                {/* 오른쪽: MyBookshelf 링크 */}
                <Button
                    component={Link}
                    href="/my-bookshelf"    // 실제 목록 페이지 경로에 맞게 수정
                    variant="contained"
                    sx={{
                        textTransform: "none", // 대문자 변환 막기
                        bgcolor: "black",
                        borderRadius: 2,
                        px: 2.5,
                        py: 0.7,
                        fontWeight: 500,
                        fontSize: "1.2rem",
                        "&:hover": {
                            bgcolor: "#333",
                        },
                    }}
                >
                    MyBookshelf
                </Button>
            </Toolbar>
        </AppBar>
    );
}
