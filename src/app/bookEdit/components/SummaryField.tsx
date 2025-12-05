// src/components/books/fields/SummaryField.tsx
"use client";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

interface SummaryFieldProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
}

export default function SummaryField({
                                         value,
                                         onChange,
                                         placeholder = "Write a brief summary...",
                                         maxLength = 500,
                                     }: SummaryFieldProps) {
    return (
        <Stack spacing={1}>
            <Typography fontWeight={700}>Summary</Typography>
        <TextField
            fullWidth
            multiline
            minRows={3}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            inputProps={{ maxLength }}
        />
        </Stack>
    );
}
