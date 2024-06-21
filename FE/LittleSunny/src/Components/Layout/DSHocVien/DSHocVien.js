import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function DSHocVien() {
    return (
        <TableContainer sx={{ width: 1200, marginTop: 5, marginLeft: 10 }} component={Paper}>
            <h1 className="mt-3" align="center">
                DANH SÁCH HỌC VIÊN
            </h1>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 20 }}>Khóa Học</TableCell>
                        <TableCell sx={{ fontSize: 20 }}>Lớp</TableCell>
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
                            Khóa...
                        </TableCell>
                        <TableCell sx={{ fontSize: 15 }}>Lớp ...</TableCell>
                        <TableCell sx={{ fontSize: 15 }} align="center">
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
                    </TableRow>
                </TableBody>
            </Table>
            <Stack spacing={2} sx={{ float: 'inline-end', margin: 2 }}>
                <Pagination count={10} />
            </Stack>
        </TableContainer>
    );
}

export default DSHocVien;
