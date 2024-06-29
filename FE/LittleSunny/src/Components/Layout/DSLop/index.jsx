/* eslint-disable react/jsx-pascal-case */
import { Edit } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, DialogActions, DialogContent, DialogTitle, Link, Stack } from '@mui/material';
import { MRT_EditActionButtons, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import React, { useMemo, useState } from 'react';
import Popup from '~/Components/Popup';
import ListStudentInClass from './ListStudentInCalss';

const data = [
    {
        className: 'Lớp Toán 1.1',
        course: 'Toán',
        quantity: '12/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Toán 1.2',
        course: 'Toán',
        quantity: '8/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Toán 2.1',
        course: 'Toán',
        quantity: '15/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Văn 1.1',
        course: 'Văn',
        quantity: '11/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Văn 1.2',
        course: 'Văn',
        quantity: '13/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Văn 2.1',
        course: 'Văn',
        quantity: '14/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Anh Văn 1.1',
        course: 'Anh Văn',
        quantity: '2/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Anh Văn 1.2',
        course: 'Anh Văn',
        quantity: '6/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
    {
        className: 'Lớp Anh Văn 2.1',
        course: 'Anh Văn',
        quantity: '7/15',
        dateStart: '1-7-2024',
        dateEnd: '30-10-2024',
    },
];

function DSLop() {
    const [openPopup1, setOpenPopup1] = useState(false);
    const [openPopup2, setOpenPopup2] = useState(false);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'course',
                header: 'Khóa Học',
                // size: 100,
            },
            {
                accessorKey: 'className',
                header: 'Lớp Học',
                // size: 200,
            },
            {
                accessorKey: 'quantity',
                header: 'Số Lượng',
                Edit: () => null,
            },
            {
                accessorKey: 'dateStart',
                header: 'Ngày Bắt Đầu',
            },
            {
                accessorKey: 'dateEnd',
                header: 'Ngày Kết Thúc',
            },
            {
                header: 'Chi Tiết',
                size: 80,
                Edit: () => null,
                Cell: () => (
                    <Button variant="outlined" onClick={() => setOpenPopup2(true)}>
                        Chi tiết
                    </Button>
                ),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_VI,
        enableStickyHeader: true, // cố định vị trí header bảng
        enableStickyFooter: true, // cố định vị trí footer bảng
        // enableEditing: true, // Nút chỉnh sửa 1 dòng trong bảng
        enableRowActions: true,
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
        muiDetailPanelProps: {
            sx: (theme) => ({
                background: theme.palette.grey[500],
                color: theme.palette.common.white,
            }),
        },
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Thêm Lớp Học
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
            </Stack>
        ),
    });

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" className="my-5 fs-4">
                <Link underline="hover" color="inherit" href="/home">
                    Trang Chủ
                </Link>
                <Link underline="hover" color="inherit" href="/classes">
                    Danh Sách Lớp
                </Link>
            </Breadcrumbs>
            <MaterialReactTable table={table} />
            <Popup title="Chỉnh Sửa Thông Tin Lớp" openPopup1={openPopup1} setOpenPopup1={setOpenPopup1}>
                abc
            </Popup>
            <Popup title="Chi Tiết Lớp Học" openPopup2={openPopup2} setOpenPopup2={setOpenPopup2}>
                <ListStudentInClass />
            </Popup>
        </>
    );
}

export default DSLop;
