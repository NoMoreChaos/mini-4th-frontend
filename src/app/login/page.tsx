"use client";

import {NextPage} from "next";
import {Box} from "@mui/material";
import LoginCard from "@/app/login/component/LoginCard";

const LoginPage: NextPage = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{backgroundColor: '#f5f5f5'}}
        >
            <LoginCard/>
        </Box>
    )
}

export default LoginPage;
