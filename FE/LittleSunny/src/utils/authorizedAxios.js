import axios from 'axios';
import { toast } from 'react-toastify';

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
        console.log(error);
        if (error.response?.status !== 410) {
            toast.error(error.response?.data?.message || error?.message);
        }

        return Promise.reject(error);
    },
);

export default authorizedAxiosInstance;
