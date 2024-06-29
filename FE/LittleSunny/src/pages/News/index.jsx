import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleGetMyInfoAPI, handleLogoutAPI } from '~/apis';

function News() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = handleGetMyInfoAPI();
                setUser(res.data.result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleLogut = async () => {
        await handleLogoutAPI();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        toast.info('Bạn đã đăng xuất!!!');
        navigate('/home');
    };

    if (!user) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    width: '100vw',
                    height: '100vh',
                    background: 'white',
                }}
            >
                <CircularProgress />
                <Typography>Loading dashboard user...</Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                maxWidth: '1120px',
                marginTop: '1em',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '0 1em',
            }}
        >
            <Alert severity="info" sx={{ '.MuiAlert-message': { overflow: 'hidden' } }}>
                Đây là trang Dashboard sau khi user:&nbsp;
                <Typography variant="span" sx={{ fontWeight: 'bold', '&:hover': { color: '#fdba26' } }}>
                    {user?.email}
                </Typography>
                &nbsp; đăng nhập thành công thì mới cho truy cập vào.
            </Alert>

            <Button
                type="button"
                variant="contained"
                color="info"
                size="large"
                sx={{ mt: 2, maxWidth: 'min-content', alignSelf: 'flex-end' }}
                onClick={handleLogut}
            >
                Đăng xuất
            </Button>

            <Divider sx={{ my: 2 }} />
        </Box>
    );
}

export default News;
