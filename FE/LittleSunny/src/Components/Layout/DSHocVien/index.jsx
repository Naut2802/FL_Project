/* eslint-disable react/jsx-pascal-case */
import Edit from '@mui/icons-material/Edit';
import {
    Box,
    Breadcrumbs,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    Typography,
} from '@mui/material';
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import React, { useMemo, useState } from 'react';
import Popup from '~/Components/Popup';
import CourseListModal from './CourseListModal';
import FormAddStudent from './FormAddStudent';

const data = [
    {
        fullName: 'Lê Thành Tôn',
        dateBirth: '22-06-2002',
        address: '1358/30/7A Quang Trung, Phường 14, Quận Gò Vấp, TPHCM',
        phoneNumber: '0123456789',
        parrentBankNumber: '1234 1234 1234 1234',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Jane Doe  2',
        dateBirth: '22-06-2002  2',
        address: '769 Dominic Grove  2',
        phoneNumber: 'Columbus  2',
        parrentBankNumber: 'Ohio  2',
        moreDetails: {
            course: 'Văn',
            classC: 'Lớp Văn 2.3',
            schoolFee: '4000000',
            academyAbility: 'Khá',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joe Doe  3',
        dateBirth: '22-06-2002  3',
        address: '566 Brakus Inlet  3',
        phoneNumber: 'South Linda  3',
        parrentBankNumber: 'West Virginia  3',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Kevin Vandy  4',
        dateBirth: '22-06-2002  4',
        address: '722 Emie Stream  4',
        phoneNumber: 'Lincoln',
        parrentBankNumber: 'Nebraska  4',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joshua Rolluffs  5',
        dateBirth: '22-06-2002  5',
        address: '32188 Larkin Turnpike  5',
        phoneNumber: 'Charleston',
        parrentBankNumber: 'South Carolina  5',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'John Doe  6',
        dateBirth: '22-06-2002  6',
        address: '261 Erdman Ford  6',
        phoneNumber: '0123456789  6',
        parrentBankNumber: 'East Daphne  6',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Jane Doe  7',
        dateBirth: '22-06-2002  7',
        address: '769 Dominic Grove  7',
        phoneNumber: 'Columbus  7',
        parrentBankNumber: 'Ohio  7',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joe Doe  8',
        dateBirth: '22-06-2002  8',
        address: '566 Brakus Inlet  8',
        phoneNumber: 'South Linda  8',
        parrentBankNumber: 'West Virginia  8',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Kevin Vandy  9',
        dateBirth: '22-06-2002  9',
        address: '722 Emie Stream  9',
        phoneNumber: 'Lincoln  9',
        parrentBankNumber: 'Nebraska  9',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joshua Rolluffs  10',
        dateBirth: '22-06-2002  10',
        address: '32188 Larkin Turnpike  10',
        phoneNumber: 'Charleston',
        parrentBankNumber: 'South Carolina  10',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'John Doe  11',
        dateBirth: '22-06-2002  11',
        address: '261 Erdman Ford  11',
        phoneNumber: '0123456789  11',
        parrentBankNumber: 'East Daphne  11',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Jane Doe  12',
        dateBirth: '22-06-2002  12',
        address: '769 Dominic Grove  12',
        phoneNumber: 'Columbus  12',
        parrentBankNumber: 'Ohio  12',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joe Doe  13',
        dateBirth: '22-06-2002  13',
        address: '566 Brakus Inlet  13',
        phoneNumber: 'South Linda  13',
        parrentBankNumber: 'West Virginia  13',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Kevin Vandy  14',
        dateBirth: '22-06-2002  14',
        address: '722 Emie Stream  14',
        phoneNumber: 'Lincoln  14',
        parrentBankNumber: 'Nebraska  14',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joshua Rolluffs  15',
        dateBirth: '22-06-2002  15',
        address: '32188 Larkin Turnpike  15',
        phoneNumber: 'Charleston  15',
        parrentBankNumber: 'South Carolina  15',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'John Doe  16',
        dateBirth: '22-06-2002  16',
        address: '261 Erdman Ford  16',
        phoneNumber: '0123456789  16',
        parrentBankNumber: 'East Daphne  16',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Jane Doe  17',
        dateBirth: '22-06-2002  17',
        address: '769 Dominic Grove  17',
        phoneNumber: 'Columbus  17',
        parrentBankNumber: 'Ohio  17',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joe Doe  18',
        dateBirth: '22-06-2002  18',
        address: '566 Brakus Inlet  18',
        phoneNumber: 'South Linda  18',
        parrentBankNumber: 'West Virginia  18',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Kevin Vandy  19',
        dateBirth: '22-06-2002  19',
        address: '722 Emie Stream  19',
        phoneNumber: 'Lincoln  19',
        parrentBankNumber: 'Nebraska  19',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
    {
        fullName: 'Joshua Rolluffs  20',
        dateBirth: '22-06-2002  20',
        address: '32188 Larkin Turnpike  20',
        phoneNumber: 'Charleston  20',
        parrentBankNumber: 'South Carolina  20',
        moreDetails: {
            course: 'Toán',
            classC: 'Lớp Toán 1.1',
            schoolFee: '3500000',
            academyAbility: 'Giỏi',
            checkSchoolFee: 'Chưa Thanh Toán',
        },
    },
];

function DSHocVien() {
    const [openPopup1, setOpenPopup1] = useState(false);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName', //access nested data with dot notation
                header: 'Họ Tên',
                size: 200,
            },
            {
                accessorKey: 'dateBirth',
                header: 'Ngày Sinh',
                size: 100,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Địa Chỉ',
                size: 250,
            },
            {
                accessorKey: 'phoneNumber',
                header: 'Số Điện Thoại',
                size: 100,
            },
            {
                accessorKey: 'parrentBankNumber',
                header: 'Thông Tin Phụ Huynh',
                size: 100,
            },
            // {
            //     accessorKey: 'course',
            //     header: 'Khóa Học',
            //     // size: 150,
            //     enableEditing: false,
            //     Cell: ({ row }) => <Button variant="outlined">Chi tiết</Button>,
            // },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_VI,
        // enableRowNumbers: true, // đánh số dòng trong cột
        // rowNumberDisplayMode: 'original', // cố định số trong cột
        enableColumnOrdering: false, // đổi vị trí cột
        enableRowSelection: true, // cho phép chọn từng dòng trong bảng để thực hiện xóa đối tượng
        renderToolbarAlertBannerContent: ({ selectedAlert }) => {
            return (
                <Box sx={{ p: 1, px: 4, display: 'flex' }}>
                    {selectedAlert}
                    <Button color="error">Xóa thông tin học viên đã chọn</Button>
                </Box>
            );
        },
        enableColumnResizing: false, // cho phép thay đổi kích thước của cột
        enableStickyHeader: true, // cố định vị trí header bảng
        enableStickyFooter: true, // cố định vị trí footer bảng
        // enableEditing: true, // Nút chỉnh sửa 1 dòng trong bảng
        enableRowActions: true,
        renderDetailPanel: ({ row }) => {
            const { course, classC, schoolFee, academyAbility, checkSchoolFee } = row.original.moreDetails;

            function formatCurrency(amount) {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
            }

            let feeNumber = parseInt(schoolFee); // Chuyển đổi thành số nguyên
            let formattedFee = formatCurrency(feeNumber); // Định dạng tiền tệ VNĐ

            return (
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', rowGap: 2, width: '80%' }}>
                    <Typography sx={{ fontSize: 15 }}>Khóa Học: {course}</Typography>
                    <Typography sx={{ fontSize: 15 }}>Học Phí: {formattedFee}</Typography>
                    <Typography sx={{ fontSize: 15 }}>Tình trạng Học Phí: {checkSchoolFee}</Typography>
                    <Typography sx={{ fontSize: 15 }}>Lớp Học: {classC}</Typography>
                    <Typography sx={{ fontSize: 15 }}>Học Lực: {academyAbility}</Typography>
                </Box>
            );
        },
        // muiEditRowDialogProps: {
        //     maxWidth: 'lg',
        // },
        muiCreateRowModalProps: {
            maxWidth: 'sm',
        },
        muiDetailPanelProps: {
            sx: (theme) => ({
                background: theme.palette.success.main,
                color: theme.palette.common.white,
            }),
        },
        // createDisplayMode: 'modal',
        // getRowId: (row) => row.id,
        muiTableContainerProps: {
            sx: {
                height: '520px',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'semi-bold',
                fontSize: '18px',
            },
            align: 'left',
        },
        muiTableBodyCellProps: {
            sx: {
                fontSize: '15px',
            },
            align: 'left',
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Thêm Học Viên
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h4">Thêm Học Viên</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        // renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
        //     <>
        //         <DialogTitle variant="h4">Chỉnh sửa thông tin học viên</DialogTitle>
        //         <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        //             <Stack
        //                 spacing={2}
        //                 alignItems={'center'}
        //                 justifyContent={'center'}
        //                 divider={<Divider orientation="vertical" flexItem />}
        //                 direction="row"
        //             >
        //                 <Box height={500} width={400} my={4}>
        //                     <FormAddStudent />
        //                 </Box>
        //                 <Box>
        //                     <CourseListModal />
        //                 </Box>
        //             </Stack>
        //         </DialogContent>
        //         <DialogActions>
        //             {/* <MRT_EditActionButtons variant="text" table={table} row={row} /> */}
        //             <Button color="error" variant="outlined">
        //                 Cancel
        //             </Button>
        //             <Button color="success" variant="outlined">
        //                 Save
        //             </Button>
        //         </DialogActions>
        //     </>
        // ),
        renderRowActions: () => (
            <Button
                onClick={() => setOpenPopup1(true)}
                startIcon={<Edit />}
                variant="contained"
                size="medium"
                color="success"
            >
                Sửa
            </Button>
        ),
    });

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="my-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/student">
                    Danh Sách Học Viên
                </Link>
            </Breadcrumbs>
            <MaterialReactTable table={table} />
            <Popup title="Chỉnh Sửa Thông Tin Học Viên" openPopup1={openPopup1} setOpenPopup1={setOpenPopup1}>
                <Grid direction={'row'} container>
                    <Grid xs={4}>
                        <Box>
                            <FormAddStudent />
                        </Box>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={7}>
                        <Box>
                            <CourseListModal />
                        </Box>
                    </Grid>
                </Grid>
            </Popup>
        </>
    );
}

export default DSHocVien;
