import { alpha, Button, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, Stack, styled } from "@mui/material";
import React, { useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface UIProps {
    title: string;
    type: string;
    onChangeValue?: (value: string) => void;
}

const TextInputLayout = (props: UIProps) => {
    const { title, type } = props;
    const [values, setValues] = React.useState({
        values: '',
        showPassword: false,
    });

    const handleChange =
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, values: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    useEffect(() => {
        if (props.onChangeValue) props.onChangeValue(values.values)

    }, [values])
    return (
        <Stack width='100%' my={1}>
            <FormControl sx={{ }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">{title}</InputLabel>
                {/* <BootstrapInput
                    id="outlined-adornment-password"
                    type={type === 'text' ? 'text' : 'password'}
                    value={values.values}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                /> */}

                <OutlinedInput
                    id="outlined-adornment-password"
                    type={type ? 'text' : 'password'}
                    value={values.values}
                    onChange={handleChange}
                    endAdornment={type === 'password' ?
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment> : <></>
                    }
                    label={title}
                />
            </FormControl>
        </Stack>
    )
}
export default TextInputLayout;

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));