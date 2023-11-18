import { requestBuilder, paramBody } from ".";
import type { AxiosResponse  } from 'axios';

export interface BodyInteface {
    method: String;
    params: any[];
    id: Number;
}

export const requestRpc = async (body?: BodyInteface): Promise<AxiosResponse> => {
    const bodyParams = paramBody.body(body?.method, body?.params, body?.id)
    try {
        const request = await requestBuilder.post(bodyParams)
        return request
    } catch (error) {
        console.log(error);
        throw error
    }
}