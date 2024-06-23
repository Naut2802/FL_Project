import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Breadcrumbs, Link } from '@mui/material';

function ThongKe() {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/home/thongke">
                    Thống Kê
                </Link>
            </Breadcrumbs>
            <TableContainer sx={{ width: 1200, marginTop: 5, marginLeft: 10 }} component={Paper}>
                <div className="container row my-4 text-center">
                    <h1 className="col-10">THỐNG KÊ HỌC VIÊN</h1>
                    <input className="col-2 rounded-5" type="text" placeholder="Tìm kiếm" />
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 20 }}>ID</TableCell>
                            <TableCell sx={{ fontSize: 20 }}>Lớp</TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Họ Tên
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Số Điện Thoại
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Ngày Đăng Ký
                            </TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Trạng Thái
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
                                ID...
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }}>Lớp ...</TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                Nguyễn Văn A
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                xxxx .xxx .xxx
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                20/02/2024
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                Đã Thanh Toán
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <h4 className="text-end">Doanh Thu : 20.000.000 VNĐ</h4>
                <Stack spacing={2} sx={{ float: 'inline-end', margin: 2 }}>
                    <Pagination count={10} />
                </Stack>
            </TableContainer>
            <TableContainer sx={{ width: 1200, marginTop: 5, marginLeft: 10 }} component={Paper}>
                <div className="container row my-4 text-center">
                    <h1 className="col-10">THỐNG KÊ THEO THÁNG</h1>
                    <input className="col-2 rounded-5" type="date" placeholder="Tìm kiếm tháng" />
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 20 }}>Tháng</TableCell>
                            <TableCell sx={{ fontSize: 20 }}>Số Lượng</TableCell>
                            <TableCell sx={{ fontSize: 20 }} align="center">
                                Tổng Học Phí
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
                                Tháng ...
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }}>3</TableCell>
                            <TableCell sx={{ fontSize: 15 }} align="center">
                                3.000.000
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <h4 className="text-end">Doanh Thu : 20.000.000 VNĐ</h4>
                <Stack spacing={2} sx={{ float: 'inline-end', margin: 2 }}>
                    <Pagination count={10} />
                </Stack>
            </TableContainer>
        </div>
    );
}

export default ThongKe;
