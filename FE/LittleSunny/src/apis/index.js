import authorizedAxiosInstance from '~/utils/authorizedAxios';
import { API_ROOT } from '~/utils/constants';

export const handleLogoutAPI = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    return await authorizedAxiosInstance.delete(`${API_ROOT}/api/v1/auth/logout`, {
        data: { accessToken, refreshToken },
    });
};

export const refreshTokenAPI = async (refreshToken) => {
    return await authorizedAxiosInstance.put(`${API_ROOT}/api/v1/auth/refresh`, { token: refreshToken });
};
