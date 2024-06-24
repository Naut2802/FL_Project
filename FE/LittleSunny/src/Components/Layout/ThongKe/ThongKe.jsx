import React from 'react';
import { Breadcrumbs, Input, Link } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const currentYear = new Date().getFullYear();
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Thống Kê Doanh Thu Năm ' + currentYear,
        },
    },
};

export const options_1 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Thống Kê Học Viên Năm ' + currentYear,
        },
    },
};

export const options_2 = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Thống Kê...... ' + currentYear,
        },
    },
};

const labels = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Doanh Thu ',
            data: labels.map(() => faker.datatype.number({ min: 10000000, max: 500000000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
    ],
};

export const data_1 = {
    labels,
    datasets: [
        {
            label: 'Số Lượng ',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export const data_2 = {
    labels,
    datasets: [
        {
            label: 'Số Lượng ',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10000 })),
            backgroundColor: '#D0E6DC',
        },
    ],
};

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
            <div className="d-flex justify-content-center mt-2 ">
                <div className="w-50 bg-white mx-2">
                    <div className="float-end">
                        <Input type="date" />
                    </div>
                    <Bar options={options} data={data} />
                    <div className="float-end fs-5 m-2">
                        Doanh Thu: 123123123123<i class="bi bi-currency-dollar"> </i>
                    </div>
                </div>
                <div className="w-50 bg-white mx-2">
                    <div className="float-end">
                        <Input type="date" />
                    </div>
                    <Bar options={options_1} data={data_1} />
                    <div className="float-end fs-5 m-2">
                        Tổng Số Lượng: 33333<i class="bi bi-person-arms-up"></i>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center ">
                <div className="w-50 bg-white m-4">
                    <div className="float-end">
                        <Input type="date" />
                    </div>
                    <Bar options={options_2} data={data_2} />
                    <div className="float-end fs-5 m-2">Tổng </div>
                </div>
            </div>
        </div>
    );
}

export default ThongKe;
