import React from 'react';
import { Stack, Box, Typography, Link, TextField, InputLabel } from '@mui/material';
import TextInputLayout from 'components/TextInput';
import ButtonLayout from 'components/Button';


const LoginScreen = () => {

    return (
        <Stack width='100%'
            height='100%'
            sx={{ backgroundColor: 'gray' }}
        >
            <Stack direction='row' alignItems='center' height={80} pl={5} >
                <Box
                    component="img"
                    src="/images/logo.png"
                    sx={{ width: 30 }}
                    mx={2}
                />
                <Typography variant='h6' sx={{ fontSize: 25, fontWeight: 'bold', letterSpacing: 1 }}>RaceFi</Typography>
            </Stack>
            <Stack
                width='100%'
                height='100%'
                justifyContent='center'
                alignItems='center'
                p={3}
            >
                <Stack
                    width='30%'
                    height='50%'
                    p={3}
                    sx={{
                        backgroundColor: 'common.white',
                        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                        border: '1px solid rgb(230, 235, 241)',
                        borderRadius: 1,
                        boxShadow: 'rgb(0 0 0 / 8%) 0px 1px 4px',
                    }}

                >
                    <Typography variant='h3' sx={{ fontSize: '1.5rem', fontWeight: '400', margin: '20px 0px' }}>
                        Login
                    </Typography>
                    <TextInputLayout title={'Email'} value={'value'} type='text'/>
                    <TextInputLayout title={'Password'} value={'value'} type='password'/>
                    <ButtonLayout />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default LoginScreen;