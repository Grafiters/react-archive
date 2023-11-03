import { Reducer } from 'redux';

export interface SwaggerState {
  data: any;
  loading: boolean;
  error: string | null;
}
export const fetchSwaggerRequest = () => ({
  type: 'process',
});

export const fetchSwaggerSuccess = (data: any) => ({
  type: 'success',
  payload: data,
});

export const fetchSwaggerFailure = (error: string) => ({
  type: 'error',
  payload: error,
});