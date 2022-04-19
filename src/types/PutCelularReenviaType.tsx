import { PUT_CELULAR_REENVIA_REQUEST, PUT_CELULAR_REENVIA_RECEIVE, PUT_CELULAR_REENVIA_ERROR } from '../actions/actionTypes';

export interface PutCelularReenviaResponse {
    ierror: number;
    cerror: string;
}

export interface PutCelularReenviaState {
    loading: boolean;
    putCelularReenviaRespuesta: PutCelularReenviaResponse;
    error: string | null;
    message: string;
    params: string[];
}

export interface PutCelularReenviaRequestPayload {
    message: string;
    params: string[];
}

export interface PutCelularReenviaReceivePayload {
    putCelularReenviaRespuesta: PutCelularReenviaResponse;
}

export interface PutCelularReenviaErrorPayload {
    error: string | null;
}

export interface PutCelularReenviaRequest {
    type: typeof PUT_CELULAR_REENVIA_REQUEST;
    payload: PutCelularReenviaRequestPayload;
}

export interface PutCelularReenviaReceive {
    type: typeof PUT_CELULAR_REENVIA_RECEIVE;
    payload: PutCelularReenviaReceivePayload;
}

export interface PutCelularReenviaError {
    type: typeof PUT_CELULAR_REENVIA_ERROR;
    payload: PutCelularReenviaErrorPayload;
}

export type PutCelularReenviaActions = 
| PutCelularReenviaRequest
| PutCelularReenviaReceive
| PutCelularReenviaError;
