import { GET_CELULAR_REQUEST, GET_CELULAR_RECEIVE, GET_CELULAR_ERROR } from '../actions/actionTypes';

export interface GetCelularResponse {
    ierror: number;
    cerror: string;
    confirmado: boolean;
    celular: string;
    ostype: string;
    maskcelular: string;
}

export interface GetCelularState {
    loading: boolean;
    getCelularRespuesta: GetCelularResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface GetCelularRequestPayload {
    message: string;
    params: string[];
}

export interface GetCelularReceivePayload {
    getCelularRespuesta: GetCelularResponse;
}

export interface GetCelularErrorPayload {
    error: string | null;
}

export interface GetCelularRequest {
    type: typeof GET_CELULAR_REQUEST;
    payload: GetCelularRequestPayload;
}

export interface GetCelularReceive {
    type: typeof GET_CELULAR_RECEIVE;
    payload: GetCelularReceivePayload;
}

export interface GetCelularError {
    type: typeof GET_CELULAR_ERROR;
    payload: GetCelularErrorPayload;
}

export type GetCelularActions = 
| GetCelularRequest
| GetCelularReceive
| GetCelularError;
