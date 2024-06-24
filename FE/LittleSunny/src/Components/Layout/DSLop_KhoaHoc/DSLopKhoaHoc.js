import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import Table from 'react-bootstrap/Table';
import classNames from 'classnames/bind';
import styles from './DSLopKhoaHoc.module.scss';
import { Breadcrumbs, Link } from '@mui/material';

const cx = classNames.bind(styles);
function DSLopKhoaHoc() {
    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/home/course">
                    Thêm Khóa - Lớp Học
                </Link>
            </Breadcrumbs>
            <div className="d-flex justify-content-center">
                <div className={cx('wrapper', 'my-4')}>
                    <form action="">
                        <h1>Thêm Khóa - Lớp Học</h1>
                        <hr />
                        <div className={cx('input-box')}>
                            <select className="form-select" defaultValue="0">
                                <option value="0">Khóa Học</option>
                                <option value="1">Khóa Học 1</option>
                                <option value="2">Khóa Học 2</option>
                                <option value="3">Khóa Học 3</option>
                            </select>
                        </div>
                        <div className={cx('input-box')}>
                            <input type="text" placeholder="Lớp Học" required />
                        </div>
                        <hr />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end ">
                            <button type="submit" className="w-25">
                                Thêm
                            </button>
                            <button type="submit" className="w-25">
                                Làm Mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <TableContainer sx={{ width: 1200, marginTop: 5, marginLeft: 10 }} component={Paper}>
                <h1 className="mt-3" align="center">
                    DANH SÁCH LỚP - KHÓA HỌC
                </h1>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 20 }}>Khóa Học</TableCell>
                            <TableCell sx={{ fontSize: 20 }}>Lớp</TableCell>
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
                                ...
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Stack spacing={2} sx={{ float: 'inline-end', margin: 2 }}>
                    <Pagination count={10} />
                </Stack>
            </TableContainer>
        </div>
    );
}

export default DSLopKhoaHoc;
