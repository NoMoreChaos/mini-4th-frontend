// app/bookEdit/page.tsx
import { Suspense } from "react";
import BookEditClient from "./bookEditClient";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Page() {
    return (
        <Suspense
            fallback={
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    <Typography>Loading book editor...</Typography>
                </Container>
            }
        >
            <BookEditClient />
        </Suspense>
    );
}
