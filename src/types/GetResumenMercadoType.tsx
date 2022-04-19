import { GET_RESUMEN_MERCADO_REQUEST, GET_RESUMEN_MERCADO_RECEIVE, GET_RESUMEN_MERCADO_ERROR } from '../actions/actionTypes';

export interface tdsConfiguracion {
    frecuencia: string;
    horario: string;
    posicion: string;
}

export interface tdsEmisoras {
    posicion: string;
    emisora: string;
    serie: string;
}

export interface GetResumenMercadoStatus {
    loading: boolean;
    ierror: number | null;
    cerror: string;
    tdsConfiguracion: tdsConfiguracion[];
    tdsEmisoras: tdsEmisoras[];
    message: string;
    params: string[];
}

export interface resumenMercadoReceivePayload {
    ierror: number;
    cerror: string;
    tdsConfiguracion: tdsConfiguracion[];
    tdsEmisoras: tdsEmisoras[];
}

export interface resumenMercadoErrorPayload {
    error: any | null;
}

export interface resumenMercadoRequestPayload {
    message: string;
    params: string[];
}

export interface resumenMercadoRequest {
    type: typeof GET_RESUMEN_MERCADO_REQUEST;
    payload: resumenMercadoRequestPayload;
}

export type resumenMercadoReceive = {
    type: typeof GET_RESUMEN_MERCADO_RECEIVE;
    payload: resumenMercadoReceivePayload;
};

export type resumenMercadoError = {
    type: typeof GET_RESUMEN_MERCADO_ERROR;
    payload: resumenMercadoErrorPayload;
};

export type resumenMercadoActions = 
| resumenMercadoRequest
| resumenMercadoReceive
| resumenMercadoError;