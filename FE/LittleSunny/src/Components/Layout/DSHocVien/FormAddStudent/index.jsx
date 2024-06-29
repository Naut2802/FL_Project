import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';

function FormAddStudent() {
    return (
        <Box
            component="fieldset"
            sx={{
                '& > :not(style)': { my: 1, width: '100%' },
                border: 2,
                borderColor: 'darkgray',
                borderRadius: 2,
                p: 1,
            }}
            noValidate
            autoComplete="off"
        >
            <legend>Thông tin học viên</legend>
            <TextField id="outlined-basic" label="Họ Tên" variant="outlined" />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Ngày Sinh" />
            </LocalizationProvider>
            <TextField id="standard-basic" label="Địa Chỉ" variant="outlined" />
            <TextField id="standard-basic" label="Số Điện Thoại" variant="outlined" />
            <TextField id="standard-basic" label="STK Phụ Huynh" variant="outlined" />
        </Box>
    );
}

export default FormAddStudent;
