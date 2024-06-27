import authorizedAxiosInstance from '~/utils/authorizedAxios';
import { API_ROOT } from '~/utils/constants';

export const handleLogoutAPI = async () => {
    return await authorizedAxiosInstance.delete(`${API_ROOT}/api/auth/logout`);
};

export const refreshTokenAPI = async (userId) => {
    return await authorizedAxiosInstance.put(`${API_ROOT}/api/auth/refresh-token`, { 
        userId: userId
    });
};
