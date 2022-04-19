import { GET_ACUMULADO_REQUEST, GET_ACUMULADO_RECEIVE, GET_ACUMULADO_ERROR } from '../actions/actionTypes';

export interface tdsAcumulado {
    casa: string;
    comprasOp: number;
    ventasOp: number;
    porcentajeOp: number;
    compraMto: number;
    compraMtoPorc: number;
    ventaMto: number;
    ventaMtoPorc: number;
    compraTit: number;
    compraTitPorc: number;
    ventaTit: number;
    ventaTitPorc: number;
}

export interface AcumuladoStatus {
    loading: boolean;
    tdsAcumulado: tdsAcumulado[];
    error: string | null;
    message: string;
    params: string[];
}

export interface acumuladoReceivePayload {
    tdsAcumulado: tdsAcumulado[];
}

export interface acumuladoErrorPayload {
    error: any | null;
}

export interface acumuladoRequestPayload {
    message: string;
    params: string[];
}

export interface acumuladoRequest {
    type: typeof GET_ACUMULADO_REQUEST;
    payload: acumuladoRequestPayload;
}

export type acumuladoReceive = {
    type: typeof GET_ACUMULADO_RECEIVE;
    payload: acumuladoReceivePayload;
};

export type acumuladoError = {
    type: typeof GET_ACUMULADO_ERROR;
    payload: acumuladoErrorPayload;
};

export type acumuladoActions = 
| acumuladoRequest
| acumuladoReceive
| acumuladoError;