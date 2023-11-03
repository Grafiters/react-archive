import { publicBuilder } from "../store";
import { fetchSwaggerRequest, fetchSwaggerSuccess, fetchSwaggerFailure } from "./reducer";
import { Dispatch } from "react";

export const fetchingSwagger = () => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(fetchSwaggerRequest());
        try {
            const data = await publicBuilder.get('/swagger');

            dispatch(fetchSwaggerSuccess(data));

        } catch (error: any) {
            dispatch(fetchSwaggerFailure(error.message));
        }
    }
}