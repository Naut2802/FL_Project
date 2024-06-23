import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box, Button, Modal, Typography, Input, Breadcrumbs, Link } from '@mui/material';
import React from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

function DSHocVien() {
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'khoa', headerName: 'Khóa', width: 230 },
        { field: 'lop', headerName: 'Lớp', width: 230 },
    ];

    const rows = [
        { id: 1, khoa: 'Khóa ...1...', lop: 'Lớp ...1...' },
        { id: 2, khoa: 'Khóa ...2...', lop: 'Lớp ...2...' },
        { id: 3, khoa: 'Khóa ...3...', lop: 'Lớp ...3...' },
        { id: 4, khoa: 'Khóa ...4...', lop: 'Lớp ...4...' },
        { id: 5, khoa: 'Khóa ...5...', lop: 'Lớp ...5...' },
        { id: 6, khoa: 'Khóa ...6...', lop: 'Lớp ...6...' },
        { id: 7, khoa: 'Khóa ...7...', lop: 'Lớp ...7...' },
        { id: 8, khoa: 'Khóa ...8...', lop: 'Lớp ...8...' },
        { id: 9, khoa: 'Khóa ...9...', lop: 'Lớp ...9...' },
        { id: 10, khoa: 'Khóa ...10...', lop: 'Lớp ...10...' },
        { id: 11, khoa: 'Khóa ...11...', lop: 'Lớp ...11...' },
        { id: 12, khoa: 'Khóa ...12...', lop: 'Lớp ...12...' },
    ];

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/home/student">
                    Danh Sách Học Viên
                </Link>
            </Breadcrumbs>
            <TableContainer sx={{ width: 1200, marginTop: 5, marginLeft: 10 }} component={Paper}>
                <h1 className="mt-3" align="center">
                    DANH SÁCH HỌC VIÊN
                </h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Họ Tên
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Ngày Sinh
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Địa Chỉ
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Số ĐT
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                TT Phụ Huynh
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Học Phí
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
                                Nguyễn Văn A
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                20/02/2010
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                153/153 abc Q.B Tp.abcc
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                xxxx .xxx .xxx
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                Phụ Huynh A
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                4.000.0000
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                Chưa thanh toán
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                <Button onClick={handleOpen}>Chọn Lớp</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography
                                            id="modal-modal-title"
                                            variant="h6"
                                            component="h2"
                                            className="text-center"
                                        >
                                            <h3>CHỌN LỚP</h3>
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <div className="d-flex justify-content-end my-3">
                                                <Input
                                                    type="text"
                                                    placeholder="Tìm kiếm"
                                                    className="border rounded-2"
                                                ></Input>
                                            </div>
                                            <div style={{ height: 400, width: '100%' }}>
                                                <DataGrid
                                                    rows={rows}
                                                    columns={columns}
                                                    initialState={{
                                                        pagination: {
                                                            paginationModel: { page: 0, pageSize: 5 },
                                                        },
                                                    }}
                                                    pageSizeOptions={[5, 10]}
                                                    checkboxSelection
                                                />
                                                <Button variant="outlined" className="float-end mt-4 ">
                                                    Đồng Ý
                                                </Button>
                                            </div>
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

export default DSHocVien;
