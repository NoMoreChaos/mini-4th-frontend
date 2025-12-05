// app/books/[bookId]/edit/page.tsx
"use client";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

export default function BookEditPage() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Writing Area
                    </Typography>

                    {/* 여기부터 폼 UI */}
                    <Stack spacing={3} mt={2}>
                        <TextField
                            label="Book Title"
                            fullWidth
                            inputProps={{
                                maxLength: 50,
                                placeholder: "Enter a title",
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
}
