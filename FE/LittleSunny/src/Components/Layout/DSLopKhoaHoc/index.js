/* eslint-disable react/jsx-pascal-case */
import { Delete, Edit } from '@mui/icons-material';
import {
    Box,
    Breadcrumbs,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Link,
    Stack,
    Typography,
} from '@mui/material';
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import React, { useMemo, useState } from 'react';
import Popup from '~/Components/Popup';
import FormEditCourse from './FormEditCourse';

const data = [
    {
        courseName: 'Khóa Toán',
        coursePrice: 2500000,
    },
    {
        courseName: 'Khóa Văn',
        coursePrice: parseFloat('3000000'),
    },
    {
        courseName: 'Khóa Anh Văn',
        coursePrice: 3500000,
    },
];

function DSLopKhoaHoc() {
    const [openPopup1, setOpenPopup1] = useState(false);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'courseName',
                header: 'Tên Khóa Học',
                // size: 200,
            },
            {
                accessorKey: 'coursePrice',
                header: 'Giá Khóa Học',
                // size: 100,
                Cell: ({ value }) => {
                    console.log('Value in cell:', value);
                    const price = typeof value === 'number' && !isNaN(value) ? value : 0;
                    return (
                        <Typography>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                        </Typography>
                    );
                },
            },
            // {
            //     accessorKey: 'status',
            //     header: 'Trạng Thái',
            //     Cell: ({ row }) => (row.original.status ? 'Đã thanh toán' : 'Chưa thanh toán'),
            //     size: 250,
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
        enableColumnResizing: false, // cho phép thay đổi kích thước của cột
        enableStickyHeader: true, // cố định vị trí header bảng
        enableStickyFooter: true, // cố định vị trí footer bảng
        // enableEditing: true, // Nút chỉnh sửa 1 dòng trong bảng
        enableRowActions: true,
        // positionActionsColumn: 'last',
        muiCreateRowModalProps: {
            maxWidth: 'sm',
        },
        // createDisplayMode: 'modal',
        // getRowId: (row) => row.id,
        muiTableContainerProps: {
            sx: {
                minheight: '300px',
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
                Thêm Khóa Học
            </Button>
        ),
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <Box>
                <DialogTitle variant="h4">Thêm Khóa Học</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </Box>
        ),
        renderRowActions: () => (
            <Stack direction={'row'} spacing={1}>
                <Button
                    onClick={() => setOpenPopup1(true)}
                    startIcon={<Edit />}
                    variant="contained"
                    size="medium"
                    color="success"
                >
                    Sửa
                </Button>
                <Button startIcon={<Delete />} variant="contained" size="medium" color="error">
                    Xóa
                </Button>
            </Stack>
        ),
    });

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="my-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/home/student">
                    Danh Sách Khóa Học
                </Link>
            </Breadcrumbs>
            <MaterialReactTable table={table} />
            <Popup title="Chỉnh Sửa Khóa - Lớp Học" openPopup1={openPopup1} setOpenPopup1={setOpenPopup1}>
                <Grid container>
                    <Grid item>
                        <FormEditCourse />
                    </Grid>
                </Grid>
            </Popup>
        </>
    );
}

export default DSLopKhoaHoc;
