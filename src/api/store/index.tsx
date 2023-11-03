import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const BASE_URL = "https://api.caleghub.com/api/v2";

export const defaultResponse: Partial<AxiosError['response']> = {
    status: 500,
    data: {
       code: 500,
       message: 'Server error',
    },
};

export const publicApi = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    headers: {
        'Origin': 'https://www.caleghub.com',
        'Content-Type': 'application/json',
    },
});
 
export const publicBuilder = {
    get: async (path: string, data?: any, config?: AxiosRequestConfig) => {
        try {
            const requestConfig: AxiosRequestConfig = {
                ...config,
                params: data,
            };

            const response = await publicApi.get(path, requestConfig);
            return response;
        } catch (error) {
            throw error;
        }
    }
}