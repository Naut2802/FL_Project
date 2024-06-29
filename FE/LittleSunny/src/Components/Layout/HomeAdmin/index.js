import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset } from './data';
import { Breadcrumbs, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import Table from '../Table_AdminPage';
function HomeAdmin() {
    const chartSetting = {
        width: 700,
        height: 400,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };
    const valueFormatter = (value) => `${value}mm`;
    return (
        <div className="my-3 container">
            <Breadcrumbs aria-label="breadcrumb" className="mt-5 fs-4">
                <Link underline="hover" color="inherit" to="/home" className="text-decoration-none text-dark">
                    Trang Chủ
                </Link>
            </Breadcrumbs>
            <div className="row">
                <div className="col-1"></div>
                <Typography component="div" className="col-4 mt-3 w-25">
                    <Card sx={{ width: 320 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Học Viên
                            </Typography>
                            <Typography variant="h5" component="div">
                                Danh Sách Học Viên
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="info">
                                Xem Danh Sách
                            </Button>
                        </CardActions>
                    </Card>
                </Typography>
                <Typography component="div" className="col-4 mt-3 w-25">
                    <Card sx={{ minWidth: 200, width: 320 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Lớp Học
                            </Typography>
                            <Typography variant="h5" component="div">
                                Danh Sách Lớp
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="info">
                                Xem Danh Sách
                            </Button>
                        </CardActions>
                    </Card>
                </Typography>
                <Typography component="div" className="col-4 mt-3 w-25">
                    <Card sx={{ minWidth: 200, width: 330 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                ...
                            </Typography>
                            <Typography variant="h5" component="div">
                                Danh Sách ...
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button variant="contained" color="info">
                                Xem Danh Sách
                            </Button>
                        </CardActions>
                    </Card>
                </Typography>
            </div>
            <div className="container d-flex justify-content-center">
                <div className="">
                    <BarChart
                        dataset={dataset}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'doanhthu', label: 'Doanh Thu', valueFormatter },
                            { dataKey: 'hocvien', label: 'Học Viên', valueFormatter },
                        ]}
                        {...chartSetting}
                        sx={{
                            backgroundColor: 'white',
                            marginBottom: 2,
                            marginTop: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </div>
            </div>
            <div className="row container">
                <Table />
            </div>
        </div>
    );
}

export default HomeAdmin;
