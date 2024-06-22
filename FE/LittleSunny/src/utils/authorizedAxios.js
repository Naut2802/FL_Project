/* eslint-disable no-restricted-globals */
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleLogoutAPI, refreshTokenAPI } from '~/apis';

// Khởi tạo đối tượng Axios để cấu hình cho dự án
let authorizedAxiosInstance = axios.create();

// set Thời gian chờ tối đa của 1 request : 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

// cho phép tự động đính kèm và gửi lên cookie
// authorizedAxiosInstance.defaults.withCredentials = true;

// Cấu hình Interceptors
// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
    (config) => {
        // Lấy accessToken từ localStorage đính kèm vào header
        const accessToken = localStorage.getItem('accessToken');
        // const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken) {
            // Bearer để xác định loại token đang sử dụng theo tiêu chuẩn OAuth 2.0
            // Bearer là token dùng để xác thực và phân quyền. Các loại token các : Basic token, Digest token, OAuth token,...
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Mã http status code nằm trong khoảng 200 - 299 sẽ là success
        // Do something with response data
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Mã http status code nằm ngoài khoảng 200 - 299 sẽ là error
        // Do something with response error
        // Ngoại trừ mã 410 phục vụ cho việc tự động refesh lại token
        // 401: 2 token hết hạn
        if (error.response?.status === 401) {
            handleLogoutAPI().then(() => {
                location.href = '/home';
                toast.info('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
            });
        }

        // 410: gọi api refresh token
        const originalRequest = error.config;
        console.log('original request: ', originalRequest);
        if (error.response?.status === 410 && !originalRequest._retry) {
            //Gắn thêm 1 giá trị _retry luôn = true trong khoảng thời gian chờ, để việc refresh token chỉ thực hiện 1 lần tại 1 thời điểm
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            console.log(refreshToken);
            return refreshTokenAPI(refreshToken)
                .then((res) => {
                    console.log(res.data);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    const { accessToken } = res.data.result.accessToken;
                    const { refreshToken: newRefreshToken } = res.data.result.refreshToken;
                    localStorage.setItem('refreshToken', newRefreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
                    return authorizedAxiosInstance(originalRequest);
                })
                .catch((_error) => {
                    console.log(_error);
                    // handleLogoutAPI().then(() => {
                    //     location.href = '/login';
                    // });
                    handleLogoutAPI();
                    return Promise.reject(_error);
                });
        }

        if (error.response?.status !== 410) {
            toast.error(error.response?.data?.message || error?.message);
        }

        return Promise.reject(error);
    },
);

export default authorizedAxiosInstance;
