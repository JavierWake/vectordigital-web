import { POST_RESUMEN_MERCADO_REQUEST, POST_RESUMEN_MERCADO_RECEIVE, POST_RESUMEN_MERCADO_ERROR } from '../actions/actionTypes';

export interface PostResumenMercadoResponse {
    ierror: any;
    cerror: string;
}

export interface PostResumenMercadoState {
    loading: boolean;
    error: string | null;
    message: string;
    params: string[];
    response: PostResumenMercadoResponse;
    data: any;
}

export interface PostResumenMercadoReceivePayload {
    response: PostResumenMercadoResponse;
}

export interface PostResumenMercadoErrorPayload {
    error: any | null;
}

export interface PostResumenMercadoRequestPayload {
    message: string;
    params: string[];
}

export interface PostResumenMercadoRequest {
    type: typeof POST_RESUMEN_MERCADO_REQUEST;
    payload: PostResumenMercadoRequestPayload;
}

export type PostResumenMercadoReceive = {
    type: typeof POST_RESUMEN_MERCADO_RECEIVE;
    payload: PostResumenMercadoReceivePayload;
};

export type PostResumenMercadoError = {
    type: typeof POST_RESUMEN_MERCADO_ERROR;
    payload: PostResumenMercadoErrorPayload;
};

export type PostResumenMercadoActions =
    | PostResumenMercadoRequest
    | PostResumenMercadoReceive
    | PostResumenMercadoError;