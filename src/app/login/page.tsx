"use client";

import {NextPage} from "next";
import {Box} from "@mui/material";
import LoginCard from "@/app/login/component/LoginCard";
import {useLoginMutation} from "@/hooks/mutations/login/useLoginMutation";

const LoginPage: NextPage = () => {
    const loginMutation = useLoginMutation();

    const handleLogin = (username: string, password: string) => {
        loginMutation.mutate({ email: username, password });
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{backgroundColor: '#f5f5f5'}}
        >
            <LoginCard onLogin={handleLogin}/>
        </Box>
    )
}

export default LoginPage;
