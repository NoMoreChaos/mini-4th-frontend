// src/components/bookEdit/components/GenreChoice.tsx
"use client";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

interface GenreChoiceProps {
    value: string;
    onChange: (value: string) => void;
}

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

export default function GenreChoice({ value, onChange }: GenreChoiceProps) {
    return (
        <Stack spacing={1} mt={2}>
            <Typography fontWeight={700}>Genre</Typography>
            <TextField
                select
                fullWidth
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {GENRES.map((g) => (
                    <MenuItem key={g} value={g}>
                        {g}
                    </MenuItem>
                ))}
            </TextField>

        </Stack>

    );
}
