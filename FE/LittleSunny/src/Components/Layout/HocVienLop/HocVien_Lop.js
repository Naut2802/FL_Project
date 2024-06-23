import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Breadcrumbs, Button, FormControl, InputLabel, Link, MenuItem, Modal, Typography } from '@mui/material';
import React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function HocVien_Lop() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/home/classes">
                    Danh Sách Lớp
                </Link>
            </Breadcrumbs>
            <TableContainer sx={{ width: 1200, marginTop: 5, marginLeft: 10 }} component={Paper}>
                <div className="container row my-4 text-center">
                    <h1 className="col-10">DANH SÁCH LỚP</h1>
                    <input className="col-2 rounded-5" type="text" placeholder="Tìm kiếm" />
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 20 }}>Khóa</TableCell>
                            <TableCell sx={{ fontSize: 20 }}>Lớp</TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Họ Tên
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Ngày Sinh
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Số ĐT
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Điểm
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Trạng Thái
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Khác
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': {
                                    backgroundColor: 'grey',
                                },
                            }}
                        >
                            <TableCell sx={{ fontSize: 15 }} component="th" scope="row">
                                Khóa ...1...
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }}>Lớp ...1...</TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                Nguyễn Văn A
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                20/10/2010
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                xxxx .xxx .xxx
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                8
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                Chưa thanh toán
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                <Button onClick={handleOpen}>Học Phí</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Học Phí
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <FormControl fullWidth className="mt-2">
                                                <InputLabel id="demo-simple-select-label">Chọn</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={age}
                                                    label="Age"
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={10}>Chưa Thanh Toán</MenuItem>
                                                    <MenuItem value={20}>Đã Thanh Toán</MenuItem>
                                                    <MenuItem value={30}>Nợ Học Phí</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button variant="outlined" className="mt-5 float-end" type="submit">
                                                Đồng ý
                                            </Button>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Stack spacing={2} sx={{ float: 'inline-end', margin: 2 }}>
                    <Pagination count={10} />
                </Stack>
            </TableContainer>
        </>
    );
}

export default HocVien_Lop;
