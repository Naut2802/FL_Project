import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(khoa, lop, tenHV, diem, xeploai) {
    return { khoa, lop, tenHV, diem, xeploai };
}

const rows = [
    createData('Khóa 1', 'Anh', 'Nguyễn Văn A', 7, 'Tiên Tiến'),
    createData('Khóa 1', 'Toán', 'Nguyễn Văn A', 8, 'Giỏi'),
    createData('Khóa 1', 'Anh', 'Nguyễn Văn B', 8, 'Giỏi'),
    createData('Khóa 2', 'Toán', 'Nguyễn Văn C', 8, 'Giỏi'),
];

export default function DenseTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 18 }}>Khóa Học</TableCell>
                        <TableCell sx={{ fontSize: 18 }}>Lớp</TableCell>
                        <TableCell align="center" sx={{ fontSize: 18 }}>
                            Họ và Tên
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 18 }}>
                            Điểm
                        </TableCell>
                        <TableCell align="center" sx={{ fontSize: 18 }}>
                            Xếp Loại
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.khoa} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row" sx={{ fontSize: 14 }}>
                                {row.khoa}
                            </TableCell>
                            <TableCell sx={{ fontSize: 14 }}>{row.lop}</TableCell>
                            <TableCell align="center" sx={{ fontSize: 14 }}>
                                {row.tenHV}
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: 14 }}>
                                {row.diem}
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: 14 }}>
                                {row.xeploai}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
