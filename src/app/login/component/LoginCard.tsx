"use client";

import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Visibility, VisibilityOff} from "@mui/icons-material";

import PasswordTextField from "@/app/login/component/PasswordTextField";

const LoginCard = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = () => {
        if (username && password) {
            console.log("Login attempt with:", {username, password});
            // todo: 여기에 실제 로그인 로직을 추가
            router.push("/");
        } else {
            alert("아이디와 비밀번호를 입력해주세요.");
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    // 비밀번호 가시성 아이콘 클릭 시 포커스가 풀리는 현상 방지
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Card sx={{minWidth: 275, maxWidth: 400, p: 2}}>
            <CardContent>
                <Typography variant="h5" component="div" sx={{mb: 2}}>
                    로그인
                </Typography>
                <Box component="form" noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        margin="normal"
                        id="username"
                        label="아이디"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <PasswordTextField
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        handleClickShowPassword={handleClickShowPassword}
                        handleMouseDownPassword={handleMouseDownPassword}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 2, py: 1.5}}
                        onClick={handleLogin}
                    >
                        로그인
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}

export default LoginCard;
