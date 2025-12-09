"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface WritingAreaActionsProps {
    onSave?: () => void;     // 지금은 선택적(optional)
    onCancel?: () => void;   // 지금은 선택적(optional)
}


export default function WritingAreaActions({
                                               onSave,
                                               onCancel,
                                           }: WritingAreaActionsProps) {
    return (
        <Box mt={3}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={onCancel}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        boxShadow: 1,                 // 그림자 추가!
                        bgcolor: "white",
                        "&:hover": {
                            bgcolor: "#f5f5f5",
                            boxShadow: 2,               // hover 시 더 진한 shadow
                        },
                    }}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSave}
                    sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        bgcolor: "black",            // 검정색 버튼
                        color: "white",
                        boxShadow: 1,
                        "&:hover": {
                            bgcolor: "#333",           // hover 시 조금 밝은 블랙
                            boxShadow: 2,
                        },
                    }}
                >
                    Save
                </Button>
            </Stack>
        </Box>
    );
}
