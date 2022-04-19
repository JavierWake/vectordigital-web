import { PUT_SERVICIO_REQUEST, PUT_SERVICIO_RECEIVE, PUT_SERVICIO_ERROR } from '../actions/actionTypes';

export interface PutServicioResponse {
    ierror: any;
    cerror: string;
}

export interface PutServicioState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: PutServicioResponse;
    data: any;
}

export interface PutServicioReceivePayload {
    response: PutServicioResponse;
}

export interface PutServicioErrorPayload {
    error: any | null;
}

export interface PutServicioRequestPayload {
    message: string;
    params: string[];
}

export interface PutServicioRequest {
    type: typeof PUT_SERVICIO_REQUEST;
    payload: PutServicioRequestPayload;
}

export type PutServicioReceive = {
    type: typeof PUT_SERVICIO_RECEIVE;
    payload: PutServicioReceivePayload;
};

export type PutServicioError = {
    type: typeof PUT_SERVICIO_ERROR;
    payload: PutServicioErrorPayload;
};

export type PutServicioActions =
    | PutServicioRequest
    | PutServicioReceive
    | PutServicioError;