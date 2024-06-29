/* eslint-disable react/jsx-pascal-case */
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box,
    Breadcrumbs,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Link,
    Tooltip,
} from '@mui/material';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    MRT_EditActionButtons,
    MaterialReactTable,
    // createRow,
    useMaterialReactTable,
} from 'material-react-table';
import React, { useMemo, useState } from 'react';
import CourseListModal from '~/Components/Layout/DSHocVien/CourseListModal';
import Popup from '~/Components/Popup/index.js';
import { fakeData } from './makeData.ts';

const Example = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const handleOpenModal = (rowId) => {
        setSelectedRowId(rowId); // Set the selected row ID
        setOpenPopup(true);
        console.log(`Opening modal for row with ID ${rowId}`);
        // You can use the rowId to fetch additional data if needed
    };

    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <CourseListModal />;
    </Popup>;

    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName',
                header: 'Họ Tên',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.fullName,
                    helperText: validationErrors?.fullName,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            fullName: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'dateBirth',
                header: 'Ngày Sinh',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.dateBirth,
                    helperText: validationErrors?.dateBirth,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            dateBirth: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'address',
                header: 'Địa Chỉ',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.address,
                    helperText: validationErrors?.address,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            address: undefined,
                        }),
                },
            },
            {
                accessorKey: 'phoneNumber',
                header: 'SĐT',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.phoneNumber,
                    helperText: validationErrors?.phoneNumber,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            parrentBankNumber: undefined,
                        }),
                },
            },
            {
                accessorKey: 'parrentBankNumber',
                header: 'Thông Tin Phụ Huynh',
                muiEditTextFieldProps: {
                    required: true,
                    error: !!validationErrors?.parrentBankNumber,
                    helperText: validationErrors?.parrentBankNumber,
                    //remove any previous validation errors when user focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            parrentBankNumber: undefined,
                        }),
                },
            },
            {
                // accessorKey: 'course',
                header: 'Khóa học',
                size: 80,
                enableEditing: false,
                Cell: ({ row }) => (
                    <Button
                        variant="outlined"
                        onClick={() => handleOpenModal(row.original.id)} // pass necessary parameters as needed /
                    >
                        Chi tiết
                    </Button>
                ),
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
    //call READ hook
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    //call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
    //call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    //CREATE action
    const handleCreateUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createUser(values);
        table.setCreatingRow(null); //exit creating mode
    };

    //UPDATE action
    const handleSaveUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateUser(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            deleteUser(row.original.id);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)

        enableEditing: true,
        getRowId: (row) => row.id,
        muiToolbarAlertBannerProps: isLoadingUsersError
            ? {
                  color: 'error',
                  children: 'Error loading data',
              }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '500px',
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
                fontSize: '14px',
            },
            align: 'left',
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        //optionally customize modal content
        renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h4">Thêm Học Viên</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        //optionally customize modal content
        renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
            <>
                <DialogTitle variant="h4">Chỉnh sửa thông tin học viên</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {internalEditComponents}
                </DialogContent>
                <DialogActions>
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </DialogActions>
            </>
        ),
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '1rem' }}>
                <Tooltip title="Edit">
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                variant="contained"
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Thêm Học Viên
            </Button>
        ),
    });

    return <MaterialReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) => [
                ...prevUsers,
                {
                    ...newUserInfo,
                    id: (Math.random() + 1).toString(36).substring(7),
                },
            ]);
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
function useGetUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            //send api request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve(fakeData);
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'], (prevUsers) =>
                prevUsers?.map((prevUser) => (prevUser.id === newUserInfo.id ? newUserInfo : prevUser)),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (userId) => {
            queryClient.setQueryData(['users'], (prevUsers) => prevUsers?.filter((user) => user.id !== userId));
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <Breadcrumbs aria-label="breadcrumb" className="my-5 fs-4">
            <Link underline="hover" color="inherit" href="/home">
                Trang Chủ
            </Link>
            <Link underline="hover" color="inherit" href="/home/student">
                Danh Sách Học Viên
            </Link>
        </Breadcrumbs>
        <Example />
    </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//     !!email.length &&
//     email
//         .toLowerCase()
//         .match(
//             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//         );

function validateUser(user) {
    return {
        fullName: !validateRequired(user.fullName) ? 'Full Name is Required' : '',
        dateBirth: !validateRequired(user.dateBirth) ? 'Date of Birth is Required' : '',
        address: !validateRequired(user.address) ? 'Address is Required' : '',
        phoneNumber: !validateRequired(user.phoneNumber) ? 'Phone Number is Required' : '',
        parrentBankNumber: !validateRequired(user.parrentBankNumber) ? 'Parrent Information is Required' : '',
    };
}
