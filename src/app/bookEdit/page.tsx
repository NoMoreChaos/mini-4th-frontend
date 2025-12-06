// app/bookEdit/[bookId]/edit/page.tsx
"use client";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GenreChoice from "./components/genreChoice";
import Summary from "./components/SummaryField";
import Content from"./components/ContentField";
import {useState} from "react";

export default function BookEditPage() {

    // genre state
    const [genre, setGenre] = useState("Fantasy");
    // summary state
    const [summary, setSummary] = useState("");
    // content writing state
    const [content, setContent] = useState("");

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                        Writing Area
                    </Typography>

                    {/* 여기부터 폼 UI */}
                    <Stack spacing={1} mt={2}>
                        <Typography fontWeight={700}>Title</Typography>
                        <TextField
                            fullWidth
                            inputProps={{
                                maxLength: 50,
                                placeholder: "Enter a book title",
                            }}
                        />
                        {/*Genre selector*/}
                        <GenreChoice
                            value={genre}
                            onChange={setGenre}
                        />

                        {/*Summary field */}
                        <Summary
                            value={summary}
                            onChange={setSummary}

                        />

                        {/*Content writing field*/}
                        <Content value={content}
                                 onChange={setContent}
                        />

                    </Stack>
                </CardContent>
            </Card>
        </Container>
    );
}
