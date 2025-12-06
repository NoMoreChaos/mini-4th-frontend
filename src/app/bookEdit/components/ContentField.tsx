// src/components/books/fields/ContentsField.tsx
"use client";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface ContentsFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
}

export default function ContentsField({
                                          value,
                                          onChange,
                                          placeholder = "Write the full story content here...",
                                          maxLength = 5000,
                                      }: ContentsFieldProps) {
    return (
        <Stack spacing={1}>
            <Typography fontWeight={700}>Contents</Typography>

            <TextField
                fullWidth
                multiline
                minRows={6}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                inputProps={{ maxLength }}
                />
        </Stack>


    );
}
