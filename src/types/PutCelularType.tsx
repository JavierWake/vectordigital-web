import { PUT_CELULAR_REQUEST, PUT_CELULAR_RECEIVE, PUT_CELULAR_ERROR } from '../actions/actionTypes';

export interface PutCelularResponse {
    ierror: number;
    cerror: string;
}

export interface PutCelularState {
    loading: boolean;
    putCelularRespuesta: PutCelularResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutCelularRequestPayload {
    message: string;
    params: string[];
}

export interface PutCelularReceivePayload {
    putCelularRespuesta: PutCelularResponse;
}

export interface PutCelularErrorPayload {
    error: string | null;
}

export interface PutCelularRequest {
    type: typeof PUT_CELULAR_REQUEST;
    payload: PutCelularRequestPayload;
}

export interface PutCelularReceive {
    type: typeof PUT_CELULAR_RECEIVE;
    payload: PutCelularReceivePayload;
}

export interface PutCelularError {
    type: typeof PUT_CELULAR_ERROR;
    payload: PutCelularErrorPayload;
}

export type PutCelularActions = 
| PutCelularRequest
| PutCelularReceive
| PutCelularError;
