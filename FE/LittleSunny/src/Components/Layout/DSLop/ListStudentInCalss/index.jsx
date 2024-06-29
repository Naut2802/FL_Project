import { Box, Button } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import { useMemo, useState } from 'react';
import Popup from '~/Components/Popup';

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
    },
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
    },
    {
        name: {
            firstName: 'John',
            lastName: 'Doe',
        },
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
    },
    {
        name: {
            firstName: 'Jane',
            lastName: 'Doe',
        },
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
    },
    {
        name: {
            firstName: 'Joe',
            lastName: 'Doe',
        },
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
    },
    {
        name: {
            firstName: 'Kevin',
            lastName: 'Vandy',
        },
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
    },
    {
        name: {
            firstName: 'Joshua',
            lastName: 'Rolluffs',
        },
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
    },
];

function ListStudentInClass() {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'name.firstName', //access nested data with dot notation
                header: 'Họ Tên',
                size: 150,
            },
            {
                accessorKey: 'name.lastName',
                header: 'Điểm',
                size: 150,
            },
            {
                accessorKey: 'address', //normal accessorKey
                header: 'Ngày Đăng Ký',
                size: 200,
            },
            {
                accessorKey: 'city',
                header: 'Học Phí',
                size: 150,
            },
            {
                accessorKey: 'state',
                header: 'Tình Trạng Học Phí',
                size: 150,
            },
            {
                accessorKey: 'state',
                header: 'Hạn Đóng Học Phí',
                size: 150,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        localization: MRT_Localization_VI,
        enableRowSelection: true, // cho phép chọn từng dòng trong bảng để thực hiện xóa đối tượng
        renderToolbarAlertBannerContent: ({ selectedAlert }) => {
            return (
                <Box sx={{ p: 1, px: 4, display: 'flex' }}>
                    {selectedAlert}
                    <Button color="error">Xóa học viên đã chọn khỏi lớp</Button>
                </Box>
            );
        },
        muiTableContainerProps: {
            sx: {
                minheight: '300px',
            },
        },
        muiTableHeadCellProps: {
            sx: {
                fontWeight: 'semi-bold',
                fontSize: '16px',
            },
            align: 'left',
        },
        muiTableBodyCellProps: {
            sx: {
                fontSize: '14px',
            },
            align: 'left',
        },
    });

    return <MaterialReactTable table={table} />;
}

export default ListStudentInClass;
