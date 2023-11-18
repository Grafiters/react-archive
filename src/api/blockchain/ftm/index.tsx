import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse  } from 'axios';

const fantomUrl = 'https://rpc.testnet.fantom.network'


export const publicApi = axios.create({
    baseURL: fantomUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export const paramBody = {
    body: (method?: String, params?: any[], id?: Number) => {
        const body = {
            jsonrpc: "2.0",
            method: method,
            params: params || [],
            id: id
        }

        return JSON.stringify(body);
    }
}

export const requestBuilder = {
    post: async (data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
        try {
            const requestConfig: AxiosRequestConfig = {
                ...config,
            };

            const response = await publicApi.post('/', data, requestConfig);
            return response;
        } catch (error) {
            throw error
        }
    }
}