import { Box, TextField } from '@mui/material';

function FormEditCourse() {
    return (
        <Box
            component="fieldset"
            sx={{
                '& > :not(style)': { my: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" label="Tên Khóa Học" variant="outlined" />
            <TextField id="standard-basic" label="Giá Khóa Học" variant="outlined" />
        </Box>
    );
}

export default FormEditCourse;
