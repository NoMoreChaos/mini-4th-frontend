import {IconButton, InputAdornment, TextField} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React from "react";

interface PasswordTextFieldProps {
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    handleClickShowPassword: () => void;
    handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
    password,
    setPassword,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword
}) => {

    return (
        <TextField
            fullWidth
            margin="normal"
            id="password"
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default PasswordTextField;
